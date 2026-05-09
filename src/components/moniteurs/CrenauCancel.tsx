import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';
import { formatDateToISO } from '@/utils/dateUtils';
import { getMonday } from '@/utils/dateUtils';
import { formatDateToLocalYYYYMMDD } from '@/utils/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { cancelAppointment } from '@/api/monitor/planning';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  date: string | undefined;
  id: number | undefined;
  setIsOpenCancel: (isOpen: boolean) => void;
}

const CrenauCancel = ({ isOpen, onClose, date, setIsOpenCancel, id }: Props) => {
  const [reason, setReason] = useState('');
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [isCancelling, setIsCancelling] = useState(false);
  const dispatch = useDispatch();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2">
                <FiAlertTriangle className="text-red-500" />
                Annuler le rendez-vous
              </Dialog.Title>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Raison de l'annulation
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm"
                  rows={4}
                  placeholder="Veuillez indiquer la raison de l'annulation..."
                />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  onClick={onClose}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  onClick={async () => {
                    if (reason.length > 0) {
                        if (date && id) {
                            const dateISO = formatDateToISO(date);
                            const mondayDate = getMonday(new Date(dateISO));
                            const mondayISO = formatDateToLocalYYYYMMDD(mondayDate);
                           
                            setIsCancelling(true);
                            await cancelAppointment(token, id, dispatch, () => {setIsOpenCancel(false)}, mondayISO, reason);
                            setIsCancelling(false);
                        } else {
                            toast.error("Erreur lors de l'annulation du rendez-vous");
                        }
                    } else {
                      toast.error("Veuillez indiquer la raison de l'annulation");
                    }
                  }}
                  disabled={isCancelling}
                >
                    {isCancelling ? "Annulation en cours..." : "Confirmer l'annulation"}
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CrenauCancel;