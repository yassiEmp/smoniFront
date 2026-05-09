import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import Loader from '@/components/common/Loader'
import { RootState } from '@/store/configureStore'
import { useDispatch, useSelector } from 'react-redux'
import Prof from '@assets/dashboard-moniteur/Prof.png'
import { getLeconApprenants } from '@/api/monitor/apprenants'
import { LessonType } from '@/types/monitor/settings/configuration'
import { ChevronLeft, Clock4, ShieldCheck } from 'lucide-react'
import { imageUrl } from '@/api'

interface LeçonProps {
  learnerId: number;
  onBack: () => void;
}

const Leçon = ({ learnerId, onBack }: LeçonProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [lessons, setLessons] = useState<LessonType[]>([])
  const dispatch = useDispatch()
  const { token, user } = useSelector((state: RootState) => state.authReducer)

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true)
      try {
        const response = await getLeconApprenants(learnerId, token)

        if (response && response.data) {
          setLessons(response.data)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des leçons:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLessons()
  }, [learnerId, token, dispatch])

  const upcomingLessons = Array.isArray(lessons) ? lessons.filter(lesson =>
    new Date(lesson.date) >= new Date() && lesson.status !== 'cancelled'
  ) : []

  const pastLessons = Array.isArray(lessons) ? lessons.filter(lesson =>
    new Date(lesson.date) < new Date() || lesson.status === 'cancelled'
  ) : []

  const renderInstructorName = (instructor: LessonType['instructor']) => {
    if (instructor.id === user?.id) {
      return "Vous";
    }
    return `${instructor.firstname} ${instructor.lastname}`;
  };

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='md:max-w-[549px] h-full relative bg-[#F5F5F5]'>
      <div className='h-[100vh] bg-[#F5F5F5] flex flex-col'>
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
            Toutes les leçons
          </h1>
        </div>
        <div className="flex-1 scrollbar-hide overflow-y-auto max-h-[calc(100vh-45vh)] md:max-h-[calc(100vh-40vh)]">
          <div className="space-y-[24px] px-4 pb-4">
            <div className="space-y-[8px]">
              <h2 className="text-[#616161] text-sm font-medium">Prochaines leçons</h2>
              {upcomingLessons.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune leçon à venir</p>
              ) : (
                upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className='flex items-center justify-between border-[#BDBDBD] border-b p-3'>
                    <div className='flex items-center gap-2'>
                      {/* <img src={lesson.instructor.photo || Prof} width={48} height={48} alt="" className="rounded-full" /> */}
                      {lesson.instructor.photo ? (
                        <img
                          src={`${imageUrl}${lesson.instructor.photo}`}
                          alt={`${lesson.instructor.firstname} ${lesson.instructor.lastname}`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                          {`${lesson.instructor.lastname?.charAt(0) ?? ''}${lesson.instructor.firstname?.charAt(0) ?? ''}`}
                        </div>
                      )}
                      <div className='space-y-1'>
                        <div className="flex items-center gap-1">
                          <p className='font-medium'>{renderInstructorName(lesson.instructor)}</p>
                          <div className="w-1 h-1 rounded-full bg-black"></div>
                          <p className='font-medium'>{format(new Date(lesson.date), 'EEEE d MMMM yyyy', { locale: fr })}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[#616161]">
                          <p className='text-[14px]'>{lesson.start_time} → {lesson.end_time}</p>
                          <span className="text-sm">({lesson.duration} min)</span>
                        </div>
                      </div>
                    </div>
                    <Clock4 className='w-5 h-5' />
                  </div>
                ))
              )}
            </div>

            <div className="space-y-[8px]">
              <h2 className="text-[#616161] text-sm font-semibold">Leçons précédentes</h2>
              {pastLessons.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Aucune leçon passée</p>
              ) : (
                pastLessons.map((lesson) => (
                  <div key={lesson.id} className='flex items-center justify-between border-[#BDBDBD] border-b p-3'>
                    <div className='flex items-center gap-2'>
                      {lesson.instructor.photo ? (
                        <img
                          src={`${imageUrl}${lesson.instructor.photo}`}
                          alt={`${lesson.instructor.firstname} ${lesson.instructor.lastname}`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                          {`${lesson.instructor.lastname?.charAt(0) ?? ''}${lesson.instructor.firstname?.charAt(0) ?? ''}`}
                        </div>
                      )}
                      <div className='space-y-1'>
                        <div className="flex items-center gap-1">
                          <p className='font-semibold'>{renderInstructorName(lesson.instructor)} • {format(new Date(lesson.date), 'EEEE d MMMM yyyy', { locale: fr })}</p>
                        </div>
                        <div className="flex items-center gap-1 text-[#616161]">
                          <p className='text-[14px]'>{lesson.start_time} → {lesson.end_time}</p>
                          <span className="text-sm">({lesson.duration} min)</span>
                          {lesson.status === 'cancelled' && (
                            <span className="text-red-500 text-sm">(Annulée)</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ShieldCheck className='w-5 h-5' />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leçon