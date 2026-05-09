
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { toast } from 'react-hot-toast';
import { getBankAccounts } from '@/api/bankAccount';
import BankAccountForm from './BankAccountForm';
import type { BankAccount } from '@/types/bankAccount';
import { FiPlusCircle } from 'react-icons/fi';
import Loader from '@/components/common/Loader';


export default function BankAccountManager() {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddButton, setShowAddButton] = useState(false);

  const fetchBankAccount = async () => {
    try {
      setIsLoading(true);
      const response = await getBankAccounts(token);
      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        setBankAccount(response.data[0]);
      } else {
        setBankAccount(null);
        setShowAddButton(true);
      }
    } catch (error) {
      setBankAccount(null);
      setShowAddButton(true);
      toast.error('Erreur lors de la récupération du compte bancaire');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBankAccount();
    }
  }, [token]);

  const handleSuccess = () => {
    fetchBankAccount();
    toast.success('Opération réussie');
  };

  const handleDelete = () => {
    setBankAccount(null);
    setShowAddButton(true);
    toast.success('Compte bancaire supprimé');
  };

  if (isLoading) {
    return (
      <div className="w-full h-full bg-[#FDFDFD] border-[0.5px] border-[#E0E0E0] rounded-[8px] p-4">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full p-4"> 
      {showAddButton ? (
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
          <button
            onClick={() => setShowAddButton(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <FiPlusCircle size={20} />
            Ajouter vos coordonnées bancaires
          </button>
        </div>
      ) : (
        <BankAccountForm
          bankAccount={bankAccount}
          onSuccess={handleSuccess}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}