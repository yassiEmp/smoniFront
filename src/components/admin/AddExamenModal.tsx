import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addExamen } from '@/api/admin/examen';
import { useFormik } from 'formik';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getMonitors, fetchLearners } from '@/api/admin/examen';
import toast from 'react-hot-toast';

interface AddExamenModalProps {
  open: boolean;
  onClose: () => void;
  token: string;
  dispatch: any;
  statutFilter: string;
  onExamenAdded: () => void;
}

const AddExamenModal: React.FC<AddExamenModalProps> = ({ open, onClose, token, dispatch, onExamenAdded }) => {
  const [loading, setLoading] = useState(false);
  const today = new Date();
  // On force le min à maintenant (date et heure courante, minutes à 00)
  const pad = (n: number) => n.toString().padStart(2, '0');
  const minDateTime = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}T${pad(today.getHours())}:00`;

  // Les données sont maintenant passées via les props moniteurs et apprenants

  const formik = useFormik({
    initialValues: {
      datetime: '',
      moniteur: '',
      apprenant: '',
    },
    validate: values => {
      const errors: any = {};
      if (!values.datetime) errors.datetime = 'La date et l\'heure sont requises';
      if (!values.moniteur) errors.moniteur = 'Le moniteur est requis';
      if (!values.apprenant) errors.apprenant = 'L\'apprenant est requis';
      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      if (values.datetime) {
        const now = new Date();
        const selected = new Date(values.datetime);
        const yearStr = values.datetime.split('-')[0];
        const year = selected.getFullYear();
        if (selected < now) {
          toast.error("La date et l'heure ne peuvent pas être dans le passé.");
          setLoading(false);
          return;
        }
        if (yearStr.length !== 4 || isNaN(Number(yearStr))) {
          toast.error("L'année doit comporter exactement 4 chiffres.");
          setLoading(false);
          return;
        }
        if (year < now.getFullYear()) {
          toast.error("L'année ne peut pas être dans le passé.");
          setLoading(false);
          return;
        }
        if (year > 2100) {
          toast.error("L'année doit être inférieure ou égale à 2100.");
          setLoading(false);
          return;
        }
      }
      let dateTime = '';
      if (values.datetime) {
        const [date, time] = values.datetime.split('T');
        const hour = time.split(':')[0];
        dateTime = `${date} ${hour}:00:00`;
      }
      try {
        const data = await addExamen(token,dispatch,Number(values.moniteur),Number(values.apprenant),dateTime);
        if (data && !Array.isArray(data)) {
          formik.resetForm();
          setSelectedMoniteur(null);
          setSelectedApprenant(null);
          onClose();
          // Notifier le composant parent que l'examen a été ajouté
          onExamenAdded();
        } else {
          toast.error("Erreur lors de l'ajout de l'examen.");
        }
      } catch (error: any) {
        if (error?.message) {
          toast.error(error.message);
        } else {
          toast.error("Erreur lors de l'ajout de l'examen.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  // --- AsyncPaginate pour Moniteurs ---
  const [selectedMoniteur, setSelectedMoniteur] = useState<any>(null);
  const loadMoniteursOptions: LoadOptions<any, any, { page: number }> = async (inputValue,loadedOptions,additional = { page: 1 }) => {
    const { page } = additional;
    const res = await getMonitors(token, page, 10, inputValue);
    const data = res.data?.data || [];
    const options = data.map((m: any) => ({ value: m.id, label: `${m.firstname} ${m.lastname}` }));
    const hasMore = data.length === 10;
    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    };
  };

  // --- AsyncPaginate pour Apprenants ---
  const [selectedApprenant, setSelectedApprenant] = useState<any>(null);
  const loadApprenantsOptions: LoadOptions<any, any, { page: number }> = async (inputValue,loadedOptions,additional = { page: 1 }) => {
    const { page } = additional;
    const res = await fetchLearners(token, page, 10, inputValue);
    const data = res.data?.data || [];
    const options = data.map((a: any) => ({ value: a.id, label: `${a.firstname} ${a.lastname}` }));
    const hasMore = data.length === 10;
    return {
      options,
      hasMore,
      additional: { page: page + 1 },
    };
  };

  const resetAndClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={resetAndClose}>
      <SheetContent side="right" className="sm:max-w-[500px] p-0 bg-[#F5F5F5] border-none">
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 rounded-t-lg bg-[#F5F5F5]">
            <SheetHeader className="flex flex-row justify-between border-b border-[#E0E0E0] pb-5 pt-[40px] px-[20px]">
              <SheetTitle className="text-[30px] font-bold">Ajouter un examen</SheetTitle>
            </SheetHeader>
          </div>
          <form className="px-[20px] py-6 space-y-6 flex-1 flex flex-col justify-between" onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Date et heure de l'examen</label>
                <input
                  type="datetime-local"
                  className="border rounded px-3 py-2 w-full focus:border-[#6C61F6] focus:ring-[#6C61F6]"
                  {...formik.getFieldProps('datetime')}
                  required
                  min={minDateTime}
                  step={3600}
                />
                {formik.touched.datetime && formik.errors.datetime && (
                  <div className="text-xs text-red-500 mt-1">{formik.errors.datetime}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Moniteur</label>
                <AsyncPaginate
                  value={selectedMoniteur}
                  loadOptions={loadMoniteursOptions}
                  onChange={option => {
                    setSelectedMoniteur(option);
                    formik.setFieldValue('moniteur', option ? option.value : '');
                  }}
                  additional={{ page: 1 }}
                  placeholder="Rechercher un moniteur..."
                  isClearable
                  debounceTimeout={300}
                />
                {formik.touched.moniteur && formik.errors.moniteur && (
                  <div className="text-xs text-red-500 mt-1">{formik.errors.moniteur}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Apprenant</label>
                <AsyncPaginate
                  value={selectedApprenant}
                  loadOptions={loadApprenantsOptions}
                  onChange={option => {
                    setSelectedApprenant(option);
                    formik.setFieldValue('apprenant', option ? option.value : '');
                  }}
                  additional={{ page: 1 }}
                  placeholder="Rechercher un apprenant..."
                  isClearable
                  debounceTimeout={300}
                />
                {formik.touched.apprenant && formik.errors.apprenant && (
                  <div className="text-xs text-red-500 mt-1">{formik.errors.apprenant}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <button type="button" className="bg-gray-300 rounded-md px-6 py-2 text-gray-700 transition" onClick={resetAndClose}>Annuler</button>
              <button type="submit" className="bg-[#6C61F6] rounded-md px-6 py-2 text-white hover:brightness-110 transition" disabled={loading}>
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AddExamenModal; 