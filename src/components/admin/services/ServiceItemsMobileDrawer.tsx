import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { TooltipProvider  } from '@/components/ui/tooltip';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Service, ServiceItem } from '@/types/admin/services';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { 
  listServiceItem, 
  addServiceItem, 
  updateServiceItem, 
  deleteServiceItem 
} from '@/api/admin/service/services';

interface ServiceItemsMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  service: Service | null;
}

const validationSchema = Yup.object({
  label: Yup.string().required('Le libellé est requis').min(2, 'Minimum 2 caractères'),
  status: Yup.boolean().required(),
});

const ServiceItemsMobileDrawer: React.FC<ServiceItemsMobileDrawerProps> = ({
  open,
  onClose,
  service
}) => {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ServiceItem | null>(null);
  const { token } = useSelector((state: RootState) => state.authReducer);

  const formik = useFormik({
    initialValues: {
      label: '',
      status: true,
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!service) return;

      try {
        setSubmitting(true);
        
        if (editingItem) {
          await updateServiceItem(editingItem.id, values, token);
          toast.success('Item modifié avec succès');
          setEditingItem(null);
        } else {
          await addServiceItem(
            service.id,
            [{ label: values.label, status: values.status }],
            token
          );
          toast.success('Item ajouté avec succès');
        }
        
        await loadItems();
        resetForm();
      } catch (error) {
        toast.error('Une erreur est survenue');
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const loadItems = async () => {
    if (!service) return;

    try {
      setLoading(true);
      const data = await listServiceItem(service.id, token);
      setItems(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des items');
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: ServiceItem) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      await deleteServiceItem(itemToDelete.id, token);
      toast.success('Item supprimé avec succès');
      await loadItems();
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item: ServiceItem) => {
    setEditingItem(item);
    formik.setValues({
      label: item.label,
      status: item.status,
    });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    formik.resetForm();
  };

  useEffect(() => {
    if (open && service) {
      loadItems();
    }
  }, [open, service]);

  useEffect(() => {
    if (!open) {
      setEditingItem(null);
      formik.resetForm();
    }
  }, [open]);

  return (
    <TooltipProvider>
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-left p-4 border-b">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-lg">
                Gérer les items
              </DrawerTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {service && (
              <div className="pt-2">
                <p className="text-gray-600 text-sm">Service : <span className="font-medium">{service.title}</span></p>
                <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                  {service.price}€ - {service.hour} h
                </Badge>
              </div>
            )}
          </DrawerHeader>

          <div className="overflow-y-auto flex-1 p-4 space-y-4">
            {/* Formulaire d'ajout/modification */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  {editingItem ? 'Modifier l\'item' : 'Ajouter un item'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <form onSubmit={formik.handleSubmit} className="space-y-3">
                  <div>
                    <Label htmlFor="label" className="text-sm">Libellé</Label>
                    <Input
                      id="label"
                      name="label"
                      value={formik.values.label}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Ex: 1H de cours de conduite"
                      className="mt-1 text-sm"
                    />
                    {formik.touched.label && formik.errors.label && (
                      <p className="text-red-500 text-xs mt-1">{formik.errors.label}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="status"
                      checked={formik.values.status}
                      onCheckedChange={(checked) => formik.setFieldValue('status', checked)}
                    />
                    <Label htmlFor="status" className="text-sm">Item actif</Label>
                  </div>
                  
                  <div className="flex flex-col space-y-2 pt-2">
                    {editingItem && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleCancelEdit}
                        disabled={formik.isSubmitting}
                        className="text-sm"
                      >
                        Annuler
                      </Button>
                    )}
                    <Button 
                      type="submit" 
                      className="bg-blue-600 hover:bg-blue-700 text-sm"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Plus className="w-4 h-4 mr-2" />
                      )}
                      {editingItem ? 'Modifier' : 'Ajouter'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Liste des items */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Items existants</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {loading ? (
                  <div className="flex items-center justify-center py-6">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  </div>
                ) : items.length === 0 ? (
                  <div className="text-center py-6 text-gray-500">
                    <p className="text-sm">Aucun item trouvé</p>
                    <p className="text-xs">Ajoutez le premier item ci-dessus</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div 
                        key={item.id} 
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                          </div>
                          <Badge 
                            variant={item.status ? "default" : "secondary"}
                            className={`text-xs ${item.status ? "bg-green-100 text-green-800" : ""}`}
                          >
                            {item.status ? 'Actif' : 'Inactif'}
                          </Badge>
                        </div>
                        <div className="flex space-x-1 ml-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 w-8 p-0"
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item)}
                            className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent className="mx-4">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-base">Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription className="text-sm">
                  Êtes-vous sûr de vouloir supprimer l'item "{itemToDelete?.label}" ? 
                  Cette action est irréversible.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)} className="text-sm">
                  Annuler
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-sm"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DrawerContent>
      </Drawer>
    </TooltipProvider>
  );
};

export default ServiceItemsMobileDrawer;
