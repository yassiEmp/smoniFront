
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-hot-toast';
import { FiEye, FiEyeOff, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { bankAccountSchema } from '@/validations/bankAccountSchema';
import { BankAccount } from '@/types/bankAccount';
import type { BankAccountForm } from '@/types/bankAccount';
import { createBankAccount, updateBankAccount, deleteBankAccount } from '@/api/bankAccount';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface Props {
  bankAccount?: BankAccount | null;
  onSuccess?: () => void;
  onDelete?: () => void;
}

export default function BankAccountForm({ bankAccount, onSuccess, onDelete }: Props) {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [isEditing, setIsEditing] = useState(!bankAccount);
  const [showValues, setShowValues] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    if (!bankAccount?.id) return;
    try {
      await deleteBankAccount(bankAccount.id, token);
      onDelete?.();
    } catch {
      toast.error('Erreur lors de la suppression');
    }
    setShowDeleteModal(false);
  };

  const initialValues: BankAccountForm = {
    iban: bankAccount?.iban || '',
    bic: bankAccount?.bic || '',
    bank_name: bankAccount?.bank_name || '',
  };

  return (
    <>
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-[600] leading-[140%] text-black">
            Vos coordonnées bancaires
          </h3>
          {bankAccount && !isEditing && (
            <div className="flex gap-2">
              <Tippy content="Modifier">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  aria-label="Modifier" 
                >
                  <FiEdit2 size={18} />
                </button>
              </Tippy>
              <Tippy content="Supprimer">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  aria-label="Supprimer"
                >
                  <FiTrash2 size={18} />
                </button>
              </Tippy>
            </div>
          )}
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={bankAccountSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (bankAccount?.id) {
                await updateBankAccount(bankAccount.id, values, token);
                toast.success('Compte bancaire mis à jour');
              } else {
                await createBankAccount(values, token);
                toast.success('Compte bancaire créé');
              
              }
              setIsEditing(false);
              onSuccess?.();
            } catch (error) {
              console.error(error);
              toast.error('Une erreur est survenue');
            }
            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="bank_name" className="text-xs font-medium leading-[140%] text-black">
                  Nom de la banque
                </label>
                <div className="relative">
                  <Field
                    id="bank_name"
                    name="bank_name"
                    type="text"
                    placeholder="Nom de votre banque"
                    disabled={!isEditing}
                    className="h-full w-full rounded-[4px] border-[0.75px] border-[#9e9e9e] bg-[#FDFDFD] p-[12px] text-xs outline-none disabled:bg-gray-50"
                  />
                  {errors.bank_name && touched.bank_name && (
                    <div className="text-xs text-red-500">{errors.bank_name}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="iban" className="text-xs font-medium leading-[140%] text-black">
                  IBAN
                </label>
                <div className="relative">
                  <Field
                    id="iban"
                    name="iban"
                    type={showValues ? "text" : "password"}
                    placeholder="FR00 0000 0000 0000 0000 000"
                    disabled={!isEditing}
                    className="h-full w-full rounded-[4px] border-[0.75px] border-[#9e9e9e] bg-[#FDFDFD] p-[12px] text-xs outline-none disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowValues(!showValues)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700"
                    aria-label={showValues ? "Masquer" : "Afficher"}
                  >
                    {showValues ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                  {errors.iban && touched.iban && (
                    <div className="text-xs text-red-500">{errors.iban}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bic" className="text-xs font-medium leading-[140%] text-black">
                  BIC
                </label>
                <div className="relative">
                  <Field
                    id="bic"
                    name="bic"
                    type={showValues ? "text" : "password"}
                    placeholder="CEPAFRPP000"
                    disabled={!isEditing}
                    className="h-full w-full rounded-[4px] border-[0.75px] border-[#9e9e9e] bg-[#FDFDFD] p-[12px] text-xs outline-none disabled:bg-gray-50"
                  />
                  {errors.bic && touched.bic && (
                    <div className="text-xs text-red-500">{errors.bic}</div>
                  )}
                </div>
              </div>

              {(isEditing || !bankAccount) && (
                <div className="flex justify-end gap-2 pt-4">
                  {bankAccount && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
                    >
                      <FiX size={18} /> Annuler
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
                  >
                    <FiSave size={18} /> {bankAccount ? 'Enregistrer' : 'Ajouter'}
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Supprimer le compte bancaire"
        message="Êtes-vous sûr de vouloir supprimer ce compte bancaire ? Cette action est irréversible."
      />
    </>
  );
}