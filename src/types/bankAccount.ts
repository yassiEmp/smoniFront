export interface BankAccount {
  id: number;
  monitor_id: number;
  iban: string;
  bic: string;
  bank_name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface BankAccountForm {
  iban: string;
  bic: string;
  bank_name: string;
  status?: boolean;
}
