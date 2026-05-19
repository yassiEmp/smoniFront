import { apiUrl } from './index';
import { BankAccount, BankAccountForm } from '../types/bankAccount';

export const createBankAccount = async (data: BankAccountForm, token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts`, {
      credentials: "include",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getBankAccounts = async (token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts`, {
      credentials: "include",
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.json();
};

export const updateBankAccount = async (id: number, data: BankAccountForm, token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts/${id}`, {
      credentials: "include",
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteBankAccount = async (id: number, token: string) => {
  const response = await fetch(`${apiUrl}bank-accounts/${id}`, {
      credentials: "include",
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
    },
  });
  return response.json();
};
