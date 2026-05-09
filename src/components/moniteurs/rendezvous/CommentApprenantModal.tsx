import { useEffect, useState } from 'react';
import { getCommentApprenants, addCommentApprenant, updateCommentApprenants } from '@/api/monitor/apprenants';
import { Sheet, SheetContent, SheetHeader, SheetTitle, } from '@/components/ui/sheet';
import { toast } from 'react-hot-toast';
import { Mars, Venus, VenusAndMars, Phone, PencilLine } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Textarea } from '@/components/ui/textarea';
import { imageUrl } from '@/api';
import { CommentType, LearnerType } from '@/types/monitor/settings/configuration';
import Loader from '../../common/Loader';

// interface LearnerType {
//   id: number;
//   lastname: string;
//   firstname: string;
//   email: string;
//   email_verified_at: string | null;
//   phone: string;
//   genre: string | null;
//   role: string;
//   is_active: boolean;
//   photo: string;
//   created_at: string;
//   updated_at: string;
//   timing: string | null;
// }

interface CommentairesApprenantModalProps {
  learner: LearnerType;
  learnerId: number;
  onClose: () => void;
  token: string;
}


const CommentairesApprenantModal = ({ learner, learnerId, onClose, token }: CommentairesApprenantModalProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await getCommentApprenants(learnerId, token);
      setComments(res.data?.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des commentaires :', error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [learnerId]);

  const handleAdd = async () => {
    setLoadingAdd(true);
    try {
      await addCommentApprenant(learnerId, token, newComment);
      setNewComment('');
      toast.success('Commentaire ajouté');
      fetchComments();
      handleClose();
    } catch (error) {
      toast.error('Erreur lors de l\'ajout :', error);
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleEdit = (id: number, comment: string) => {
    setEditingId(id);
    setEditingText(comment);
  };

  const handleUpdate = async () => {
    if (!editingText.trim() || editingId === null) return;
    setLoadingEdit(true);
    try {
      await updateCommentApprenants(editingId, editingText, token);
      setEditingId(null);
      setEditingText('');
      toast.success('Commentaire modifié');
      fetchComments();
    } catch (error) {
      toast.error('Erreur lors de la modification :', error);
    } finally {
      setLoadingEdit(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`${isMobile ? 'h-[80vh] rounded-t-xl' : 'sm:max-w-[450px]'} p-0 bg-white border-none transition-transform duration-300 ease-in-out ${
          isClosing
            ? isMobile
              ? 'translate-y-full'
              : 'translate-x-full'
            : isMobile
            ? 'translate-y-0'
            : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex flex-row justify-between pb-2 pt-6 px-6">
            <SheetTitle className="text-xl font-semibold">Commentaires de l'apprenant</SheetTitle>
          </SheetHeader>
          <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-5 px-6 mt-5">
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className="text-xl font-bold">{learner.firstname} {learner.lastname}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>
                  {learner.genre === "homme" ? <Mars className="w-5 h-5 text-[#212121]" /> : learner.genre === "femme" ? <Venus className="w-5 h-5 text-[#212121]" /> : <VenusAndMars className="w-5 h-5 text-[#212121]" />}
                </span>
                <p className="text-[14px] font-medium text-[#212121]">
                  {learner.genre || "Genre non renseigné"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#212121]" />
                <p className="text-[14px] font-medium text-[#212121]">
                  {learner.phone || "Téléphone non renseigné"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              {/* {learner.photo ? (
                <img src={learner.photo} width={80} height={80} alt="Photo de profil" className="rounded-full" />
              ) : (
                <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-gray-200">
                  <span className="text-2xl text-gray-500">👤</span>
                </div>
              )} */}
              {learner.photo ? (
                  <img
                    src={`${imageUrl}${learner.photo}`}
                    alt={`${learner.firstname} ${learner.lastname}`}
                    className="h-32 w-32 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-gray-500 flex items-center justify-center text-4xl font-semibold text-white">
                    {`${learner.lastname?.charAt(0) ?? ''}${learner.firstname?.charAt(0) ?? ''}`}
                  </div>
                )}
            </div>
          </div>
          {/* <SheetHeader className="flex flex-row justify-between border-b border-gray-200 pb-5 pt-6 px-6">
            <SheetTitle className="text-xl font-semibold">Commentaires de l'apprenant</SheetTitle>
          </SheetHeader> */}
          <div className="flex-1 scrollbar-hide overflow-y-auto p-4 space-y-4">
            {loadingComments ? (
              <div className='flex justify-center items-center h-full'><Loader /></div>
            ) : comments.length === 0 ? (
              <div className="text-gray-500">Aucun commentaire pour le moment.</div>
            ) : (
              <div className='space-y-[24px]'>
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='flex items-start gap-2 py-2 border-b-[0.5px] border-[#E0E0E0]'
                  >
                    {/* <img
                      src={comment.monitor && comment.monitor.photo ? `${imageUrl}${comment.monitor.photo}` : Prof}
                      alt={comment.monitor ? `${comment.monitor.firstname} ${comment.monitor.lastname}` : ''}
                      className="w-10 h-10 rounded-full object-cover"
                    /> */}
                    {comment.monitor.photo ? (
                      <img
                        src={`${imageUrl}${comment.monitor.photo}`}
                        alt={`${comment.monitor.firstname} ${comment.monitor.lastname}`}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                        {`${comment.monitor.lastname?.charAt(0) ?? ''}${comment.monitor.firstname?.charAt(0) ?? ''}`}
                      </div>
                    )}
                    <div className='flex-1 space-y-1'>
                      <div className="flex items-center justify-between">
                        <h3 className='text-xs font-medium'>
                          {comment.monitor_id === user?.id ? 'Vous' : comment.monitor ? `${comment.monitor.firstname} ${comment.monitor.lastname}` : ''}
                        </h3>
                        {comment.monitor_id === user?.id && editingId !== comment.id && (
                          <button
                            onClick={() => handleEdit(comment.id, comment.comment)}
                            className="p-1 hover:bg-gray-100 rounded-full"
                          >
                            <PencilLine className="w-4 h-4 text-gray-500" />
                          </button>
                        )}
                      </div>
                      {editingId === comment.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="min-h-[100px] bg-[#FAFAFA]"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => { setEditingId(null); setEditingText(''); }}
                              className="px-4 py-2 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={handleUpdate}
                              disabled={loadingEdit}
                              className="px-4 py-2 text-xs font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {loadingEdit ? (
                                <>
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
                ))}
              </div>
            )}
          </div>
          <div className="border-t border-gray-200 p-4">
            <Textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full p-2 border border-gray-300 rounded mb-2 min-h-[80px] bg-[#FAFAFA]"
              rows={2}
            />
            <button
              onClick={handleAdd}
              disabled={loadingAdd || !newComment.trim()}
              className={`w-full rounded-[6.22px] border-[0.39px] border-[#F5F5F5] bg-[#6C61F6] py-[16px] text-[12px] font-semibold leading-[140%] text-[#FDFDFD] ${loadingAdd ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loadingAdd ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentairesApprenantModal; 