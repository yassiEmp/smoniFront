import { apiUrl } from './index';
import { BankAccount, BankAccountForm } from '../types/bankAccount';

export const createBankAccount = async (data: BankAccountForm, token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getBankAccounts = async (token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};

export const updateBankAccount = async (id: number, data: BankAccountForm, token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteBankAccount = async (id: number, token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.json();
};
