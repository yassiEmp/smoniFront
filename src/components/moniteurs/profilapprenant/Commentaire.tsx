import { ChevronLeft, Pencil } from 'lucide-react'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/configureStore'
import { getCommentApprenants, updateCommentApprenants } from '@/api/monitor/apprenants'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Loader from '@/components/common/Loader'
import { imageUrl } from '@/api'
import { CommentType } from '@/types/monitor/settings/configuration'
import { Textarea } from '@/components/ui/textarea'

interface CommentaireProps {
  onBack: () => void;
  learnerId: number;
}

const Commentaire = ({ onBack, learnerId }: CommentaireProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedComment, setEditedComment] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { token, user } = useSelector((state: RootState) => state.authReducer);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentApprenants(learnerId, token, currentPage);
        if (response.success && response.data.data) {
          if (currentPage === 1) {
            setComments(response.data.data);
          } else {
            setComments(prevComments => [...prevComments, ...response.data.data]);
          }

          setHasMore(response.data.current_page < response.data.last_page);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des commentaires:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [learnerId, token, currentPage]);

  const handleEditClick = (comment: CommentType) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.comment);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment('');
  };

  const handleSaveEdit = async () => {
    if (!editingCommentId) return;

    try {
      setIsSaving(true);
      const response = await updateCommentApprenants(editingCommentId, editedComment, token);
      
      if (response.success) {
        setComments(prevComments =>
          prevComments.map(comment =>
            comment.id === editingCommentId
              ? { ...comment, comment: editedComment }
              : comment
          )
        );

        setEditingCommentId(null);
        setEditedComment('');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading && currentPage === 1) {
    return <Loader />;
  }

  console.log(comments)

  return (
    <div className="md:max-w-[549px] h-full relative bg-[#F5F5F5]">
      <div className="h-screen bg-[#F5F5F5] flex flex-col">
        <div className="flex items-center gap-2 py-2">
          <button
            className="hover:bg-gray-100 rounded-full hover:cursor-pointer"
            onClick={onBack}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1
            className="text-lg font-medium cursor-pointer"
            onClick={onBack}
          >
            Tous les commentaires
          </h1>
        </div>
        <div className="flex-1 scrollbar-hide overflow-y-auto max-h-[calc(100vh-50vh)] sm:max-h-[calc(100vh-40vh)]">
          <div className='space-y-[24px] px-4 pb-4'>
            <div className='space-y-[8px]'>
              {comments.length === 0 ? (
                <p className="text-center text-gray-500 py-4">Aucun commentaire pour le moment</p>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    ref={index === comments.length - 1 ? lastCommentRef : null}
                    className='flex items-start gap-2 py-2 border-b-[0.5px] border-[#E0E0E0]'
                  >
                    <img
                      src={`${imageUrl}${comment.monitor.photo}`}
                      alt={`${comment.monitor.firstname} ${comment.monitor.lastname}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className='flex-1 space-y-1'>
                      <div className="flex items-center justify-between">
                        <h3 className='text-xs font-medium'>
                          {comment.monitor_id === user?.id ? 'Vous' : `${comment.monitor.firstname} ${comment.monitor.lastname}`}
                        </h3>
                        {comment.monitor_id === user?.id && !editingCommentId && (
                          <button
                            onClick={() => handleEditClick(comment)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <Pencil className="w-4 h-4 text-gray-500" />
                          </button>
                        )}
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            className="min-h-[100px] bg-[#FAFAFA]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={handleSaveEdit}
                              disabled={isSaving}
                              className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {isSaving ? (
                                <>
                                  <div className="w-4 h-4">
                                    {/* <Loader /> */}
                                  </div>
                                  Enregistrement...
                                </>
                              ) : (
                                'Enregistrer'
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className='text-sm text-[#616161]'>{comment.comment}</p>
                          <span className='text-xs text-[#616161]'>
                            {format(new Date(comment.created_at), 'dd MMM. yyyy', { locale: fr })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
              {loading && currentPage > 1 && (
                <div className="flex justify-center py-4">
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Commentaire