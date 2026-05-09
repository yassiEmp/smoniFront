import React from 'react';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
import { CategoryService, Service} from '@/types/admin/services';
import { addService, updateService } from '@/api/admin/service/services';
import { useAppSelector } from "@/store/hooks";

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  onServiceSaved: () => void;
  categories: CategoryService[];
  editingService?: Service | null;
}

const NO_TYPE_VALUE = 'none';

const validationSchema = Yup.object({
  category_service_id: Yup.string().required('La catégorie est requise'),
  title: Yup.string().required('Le titre est requis').min(2, 'Minimum 2 caractères'),
  price: Yup.number().required('Le prix est requis').min(0, 'Le prix doit être positif'),
  type: Yup.string().oneOf(['automatic', 'manual', NO_TYPE_VALUE]).notRequired(),
  time: Yup.number().required('La durée est requise').min(0, 'La durée doit être positive'),
  hour: Yup.number().nullable().min(0, 'Les heures doivent être positives'),
  items: Yup.array().of(
    Yup.object({
      label: Yup.string().required('Le libellé est requis'),
      status: Yup.boolean().required(),
    })
  ),
});

const ServiceModal: React.FC<ServiceModalProps> = ({
  open,
  onClose,
  onServiceSaved,
  categories,
  editingService
}) => {
  const { token } = useAppSelector((state) => state.authReducer);

  const formik = useFormik({
    initialValues: {
      category_service_id: editingService?.category_service_id.toString() || '',
      title: editingService?.title || '',
      price: editingService?.price || 0,
      type: (editingService?.type as any) || NO_TYPE_VALUE,
      time: editingService?.time || 0,
      hour: editingService?.hour || null,
      items: editingService?.items.map(item => ({ label: item.label, status: item.status })) || [],
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const payload: any = { ...values };
        if (payload.type === NO_TYPE_VALUE) {
          delete payload.type;
        }

        if (editingService) {
          await updateService(editingService.id, payload, token);
          toast.success('Service modifié avec succès');
        } else {
          await addService(payload, token);
          toast.success('Service ajouté avec succès');
        }

        onServiceSaved();
        onClose();
      } catch (error) {
        toast.error('Une erreur est survenue');
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingService ? 'Modifier le service' : 'Ajouter un service'}
          </DialogTitle>
        </DialogHeader>
        
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category_service_id">Catégorie</Label>
                <Select
                  value={formik.values.category_service_id}
                  onValueChange={(value) => formik.setFieldValue('category_service_id', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formik.touched.category_service_id && formik.errors.category_service_id && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.category_service_id}</p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                  id="title"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ex: Leçon de conduite"
                  className="mt-1"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="price">Prix (€)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="62"
                  className="mt-1"
                />
                {formik.touched.price && formik.errors.price && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
                )}
              </div>

              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formik.values.type}
                  onValueChange={(value) => formik.setFieldValue('type', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={NO_TYPE_VALUE}>Aucun</SelectItem>
                    <SelectItem value="automatic">Automatique</SelectItem>
                    <SelectItem value="manual">Manuelle</SelectItem>
                  </SelectContent>
                </Select>
                {formik.touched.type && formik.errors.type && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.type as any}</p>
                )}
              </div>

              <div>
                <Label htmlFor="time">Jours</Label>
                <Input
                  id="time"
                  name="time"
                  type="number"
                  value={formik.values.time}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="30"
                  className="mt-1"
                />
                {formik.touched.time && formik.errors.time && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.time}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="hour">Nombre d'heures</Label>
              <Input
                id="hour"
                name="hour"
                type="number"
                step="1"
                value={formik.values.hour ?? ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="1"
                className="mt-1"
              />
              {formik.touched.hour && formik.errors.hour && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.hour}</p>
              )}
            </div>

         {!editingService && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Items du service (optionnel)</CardTitle>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newItems = [...formik.values.items, { label: '', status: true }];
                      formik.setFieldValue('items', newItems);
                    }}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter un item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <FieldArray name="items">
                  {() => (
                    <div className="space-y-3">
                      {formik.values.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <div className="flex-1">
                            <Input
                              name={`items.${index}.label`}
                              value={item.label}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              placeholder="Ex: 1H de cours de conduite"
                            />
                            {formik.touched.items?.[index]?.label && formik.errors.items?.[index] && 
                            typeof formik.errors.items[index] === 'object' && 
                            'label' in (formik.errors.items[index] as any) && (
                              <p className="text-red-500 text-sm mt-1">
                                {(formik.errors.items[index] as any).label}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`items.${index}.status`}
                              checked={item.status}
                              onCheckedChange={(checked) => 
                                formik.setFieldValue(`items.${index}.status`, checked)
                              }
                            />
                            <Label htmlFor={`items.${index}.status`} className="text-sm">
                              Actif
                            </Label>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newItems = formik.values.items.filter((_, i) => i !== index);
                              formik.setFieldValue('items', newItems);
                            }}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      {formik.values.items.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          Aucun item ajouté. Vous pouvez en ajouter pour détailler le service.
                        </p>
                      )}
                    </div>
                  )}
                </FieldArray>
              </CardContent>
            </Card>
          )}

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                disabled={formik.isSubmitting}
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                {editingService ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;
