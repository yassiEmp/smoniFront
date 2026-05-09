import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { ExamenType } from '@/pages/admin/Examen';
import { useFormik } from 'formik';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getMonitors, updateExamen, fetchLearners } from '@/api/admin/examen';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/configureStore';
import { format } from 'date-fns';
import Loader from '../common/Loader';

interface StatutExamenProps {
  examen: ExamenType;
  onClose: () => void;
  onExamenUpdated: () => void;
}

// Fonction utilitaire pour formater la date au format attendu par input datetime-local
function toDatetimeLocal(dateString: string) {
  if (!dateString) return '';
  // Gère les formats 'YYYY-MM-DD HH:mm:ss' ou 'YYYY-MM-DDTHH:mm:ss'
  return dateString.replace(' ', 'T').slice(0, 16);
}

const StatutExamen: React.FC<StatutExamenProps> = ({ examen, onClose, onExamenUpdated }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { token } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  // Responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Formik pour édition
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      datetime: toDatetimeLocal(examen.date),
      moniteur: examen.moniteur?.id || '',
    },
    validate: values => {
      const errors: any = {};
      if (!values.datetime) errors.datetime = 'La date et l\'heure sont requises';
      if (!values.moniteur) errors.moniteur = 'Le moniteur est requis';
      return errors;
    },
    onSubmit: async (values) => {
      let dateTime = '';
      if (values.datetime) {
        const dateObj = new Date(values.datetime);
        dateTime = format(dateObj, 'yyyy-MM-dd HH:00:00');
      }
      try {
        await updateExamen(token, dispatch, examen.id, Number(values.moniteur), examen.apprenant.id, dateTime);
        formik.resetForm();
        // Notifier le composant parent que l'examen a été modifié
        onExamenUpdated();
        handleClose();
      } catch (error: any) {
        if (error?.message) {
          console.error(error.message);
        } else {
          console.error("Erreur lors de la modification de l'examen.");
        }
      }
    },
  });

  // --- AsyncPaginate pour Moniteurs ---
  const [selectedMoniteur, setSelectedMoniteur] = useState<any>(
    examen.moniteur?.id
      ? { value: examen.moniteur.id, label: `${examen.moniteur.firstname} ${examen.moniteur.lastname}` }
      : null
  );

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
  const [selectedApprenant] = useState<any>(
    examen.apprenant?.id
      ? { value: examen.apprenant.id, label: `${examen.apprenant.firstname} ${examen.apprenant.lastname}` }
      : null
  );

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

  // Harmonize closing animation with DetailExamen
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <Sheet open={true} onOpenChange={handleClose}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={`${isMobile ? 'h-[70vh] rounded-t-xl' : 'sm:max-w-[500px]'} p-0 bg-[#F5F5F5] border-none transition-transform duration-300 ease-in-out ${isClosing
          ? isMobile
            ? 'translate-y-full'
            : 'translate-x-full'
          : isMobile
            ? 'translate-y-0'
            : 'translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="sticky top-0 z-10 rounded-t-lg bg-[#F5F5F5]">
            <SheetHeader className="flex flex-row justify-between border-b border-[#E0E0E0] pb-5 pt-[40px] px-[20px]">
              <SheetTitle className="text-[28px] font-bold">Modifier l'examen</SheetTitle>
            </SheetHeader>
          </div>

          <form className="flex flex-col h-full" onSubmit={formik.handleSubmit}>
            <div className="flex-1 px-[20px] py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Date et heure de l'examen</label>
                <input
                  type="datetime-local"
                  className="border rounded px-3 py-2 w-full focus:border-[#6C61F6] focus:ring-[#6C61F6]"
                  {...formik.getFieldProps('datetime')}
                  required
                  min={new Date().toISOString().slice(0, 13) + ':00'}
                  step={3600}
                  readOnly
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
                  onChange={() => {}}
                  additional={{ page: 1 }}
                  placeholder="Rechercher un apprenant..."
                  isClearable={false}
                  isDisabled
                  debounceTimeout={300}
                />
              </div>
            </div>
            <div className="flex flex-col px-[20px] pb-6 pt-2 gap-2 justify-end bg-[#F5F5F5]">
              <button
                type="button"
                className="bg-gray-300 rounded-md px-6 py-2 text-gray-700 transition"
                onClick={handleClose}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="bg-[#6C61F6] rounded-md px-6 py-2 text-white hover:brightness-110 transition"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default StatutExamen; 