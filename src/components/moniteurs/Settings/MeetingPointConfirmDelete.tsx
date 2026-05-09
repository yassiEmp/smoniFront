import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { deleteMeetingPoint } from '@/api/monitor/parametre';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface MeetingPointConfirmDeleteProps {
  closeModal: () => void;
  id: number;
  onDeleteSuccess: () => void;
}

const MeetingPointConfirmDelete = ({ closeModal, id, onDeleteSuccess }: MeetingPointConfirmDeleteProps) => {
  const { token } = useSelector((state: RootState) => state.authReducer);

  const handleDelete = async () => {
    try {
      await deleteMeetingPoint(id, token);
      onDeleteSuccess();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de la suppression du point de rendez-vous", error);
    }
  };

  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeModal}>
        <Transition
          as={Fragment}
          show={true}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900 flex items-center gap-2">
                <FiAlertTriangle className="text-red-500" />
                Supprimer le point de rendez-vous
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Êtes-vous sûr de vouloir supprimer ce point de rendez-vous ? Cette action est irréversible.
                </p>
              </div>

              <div className="mt-4 flex justify-between gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  onClick={closeModal}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Supprimer
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MeetingPointConfirmDelete; 