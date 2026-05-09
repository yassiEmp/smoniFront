import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { CategoryService } from '@/types/admin/services';
import { 
  listCategoryService, 
  addCategoryService, 
  updateCategoryService, 
  deleteCategoryService 
} from '@/api/admin/service/services';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from '@/components/common/Loader';

const validationSchema = Yup.object({
  label: Yup.string().required('Le nom de la catégorie est requis').min(2, 'Minimum 2 caractères'),
});

const CategoriesTab: React.FC = () => {
  const [categories, setCategories] = useState<CategoryService[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryService | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryService | null>(null);

  const { token } = useSelector((state: RootState) => state.authReducer);

//un console.log de editingCategory dans useEffect
 

  const formik = useFormik({
    initialValues: {
      label: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        setSubmitting(true);
        
        if (editingCategory) {
          await updateCategoryService(editingCategory.id, values, token);
          toast.success('Catégorie modifiée avec succès');
          console.log('Category updated:', editingCategory.id, values);
        } else {
          await addCategoryService(values, token);
          toast.success('Catégorie ajoutée avec succès');
        }
        
        await loadCategories();
        resetForm();
        setModalOpen(false);
        setEditingCategory(null);
      } catch (error) {
        toast.error('Une erreur est survenue');
        console.error('Error:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await listCategoryService(token);
      setCategories(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories');
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (category: CategoryService) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategoryService(categoryToDelete.id, token);
      toast.success('Catégorie supprimée avec succès');
      await loadCategories();
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    } catch (error: any) {
      if (error?.status === 403) {
        toast.error("Il existe déjà des services pour cette catégorie");
      } else {
        toast.error('Erreur lors de la suppression');
      }
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category: CategoryService) => {
    setEditingCategory(category);
    formik.setValues({ label: category.label });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingCategory(null);
    formik.resetForm();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  if (loading && categories.length === 0) {
    return (
      <>
        <Loader/>
      </>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Catégories</h2>
            <p className="text-sm sm:text-base text-gray-600">Gérez les catégories de vos services</p>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-sm sm:text-base px-3 sm:px-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une catégorie
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Créer une nouvelle catégorie</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Liste des catégories</CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {categories.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-500 px-4">
                <p className="text-sm sm:text-base">Aucune catégorie trouvée</p>
                <p className="text-xs sm:text-sm">Commencez par ajouter votre première catégorie</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className='bg-gray-100'>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">Nom de la catégorie</TableHead>
                      <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Créé le</TableHead>
                      <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Mise à jour le</TableHead>
                      <TableHead className="w-[80px] sm:w-[120px] text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium text-sm sm:text-base p-2 sm:p-4">
                          <div>
                            <div>{category.label}</div>
                            <div className="sm:hidden text-xs text-gray-500 mt-1">
                              {formatDate(category.created_at)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs sm:text-sm text-gray-600 p-2 sm:p-4">
                          {formatDate(category.created_at)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-xs sm:text-sm text-gray-600 p-2 sm:p-4">
                          {formatDate(category.updated_at)}
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <div className="flex space-x-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(category)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 w-8 p-0"
                                >
                                  <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Modifier la catégorie</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(category)}
                                  className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Supprimer la catégorie</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={modalOpen} onOpenChange={handleModalClose}>
          <DialogContent className="sm:max-w-md mx-4">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                {editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="label" className="text-sm sm:text-base">Nom de la catégorie</Label>
                <Input
                  id="label"
                  name="label"
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Ex: Conduite"
                  className="mt-1 text-sm sm:text-base"
                />
                {formik.touched.label && formik.errors.label && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{formik.errors.label}</p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleModalClose}
                  disabled={formik.isSubmitting}
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto text-sm sm:text-base"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  {editingCategory ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer la catégorie "{categoryToDelete?.label}" ? 
                Cette action est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
                Annuler
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default CategoriesTab;