import * as Yup from 'yup';

export const bankAccountSchema = Yup.object().shape({
  iban: Yup.string()
    .required('IBAN requis')
    .max(34, 'IBAN trop long')
    .matches(/^[A-Za-z]{2}[0-9]{2}[A-Z0-9]{1,30}$/, 'Format IBAN invalide'),
  bic: Yup.string()
    .required('BIC requis')
    .max(11, 'BIC trop long')
    .matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, 'Format BIC invalide'),
  bank_name: Yup.string()
    .required('Nom de la banque requis')
    .max(255, 'Nom trop long')
});