import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Pencil, Puzzle, ToggleLeft, ToggleRight } from 'lucide-react';
import { CategoryService, Service } from '@/types/admin/services';
import { 
  listCategoryService, 
  listService, 
  listServiceByCategory,
  updateServiceStatus, 
  
} from '@/api/admin/service/services';
import ServiceModal from './ServiceModal';
import ServiceItemsDrawer from './ServiceItemsDrawer';
import ServiceItemsMobileDrawer from './ServiceItemsMobileDrawer';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from '@/components/common/Loader';

const PER_PAGE_OPTIONS = [10, 20, 50];

const ServicesTab: React.FC = () => {
  const [categories, setCategories] = useState<CategoryService[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  // const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  // const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // const [statusMap, setStatusMap] = useState<Record<number, boolean>>({});

  // Pagination state
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });

  const { token } = useSelector((state: RootState) => state.authReducer);

  const loadCategories = async () => {
    try {
      const data = await listCategoryService(token);
      setCategories(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des catégories');
      console.error('Error loading categories:', error);
    }
  };

  const loadServices = async (categoryId?: number, page: number = 1, perPage: number = pagination.per_page) => {
    try {
      setLoading(true);
      if (categoryId) {
        // Pas de pagination pour la liste par catégorie
        const data = await listServiceByCategory(categoryId, token);
        setServices(data);
        
        setPagination(prev => ({
          ...prev,
          current_page: 1,
          last_page: 1,
          total: data.length,
        }));
      } else {
        const data = await listService(token, page, perPage);
        setServices(data.data);

        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
        });
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des services');
      setServices([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      });
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    if (value === 'all') {
      loadServices(undefined, 1, pagination.per_page);
    } else {
      loadServices(parseInt(value), 1, pagination.per_page);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setPagination((prev) => ({ ...prev, per_page: perPage, current_page: 1 }));
  };

  // const handleDelete = async (service: Service) => {
  //   setServiceToDelete(service);
  //   setDeleteDialogOpen(true);
  // };

  // const confirmDelete = async () => {
  //   if (!serviceToDelete) return;

  //   try {
  //     await deleteService(serviceToDelete.id);
  //     toast.success('Service supprimé avec succès');
  //     await loadServices(selectedCategory === 'all' ? undefined : parseInt(selectedCategory));
  //     setDeleteDialogOpen(false);
  //     setServiceToDelete(null);
  //   } catch (error) {
  //     toast.error('Erreur lors de la suppression');
  //     console.error('Error deleting service:', error);
  //   }
  // };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleManageItems = (service: Service) => {
    setSelectedService(service);
    setDrawerOpen(true);
  };

  const handleToggleStatus = async (service: Service) => {
    try {
      await updateServiceStatus(service.id, token);
     await loadServices(selectedCategory === 'all' ? undefined : parseInt(selectedCategory));
     toast.success('Statut du service modifié avec succès');

    } catch (error) {
      toast.error('Erreur lors de la modification du statut du service');
      console.error('Error updating service status:', error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingService(null);
  };

  const handleServiceSaved = () => {
    loadServices(selectedCategory === 'all' ? undefined : parseInt(selectedCategory));
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : 'Inconnue';
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      loadServices(undefined, pagination.current_page, pagination.per_page);
    } else {
      loadServices(parseInt(selectedCategory), 1, pagination.per_page);
    }
    // eslint-disable-next-line
  }, [token, pagination.current_page, pagination.per_page, selectedCategory]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading && services.length === 0) {
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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Services</h2>
            <p className="text-sm sm:text-base text-gray-600">Gérez vos services et leurs éléments</p>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto text-sm sm:text-base px-3 sm:px-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un service
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Créer un nouveau service</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Card>
          <CardHeader className="p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-base sm:text-lg">Liste des services</CardTitle>
              <div className="w-full sm:w-64">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Filtrer par catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">-- Toutes les catégories --</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {services.length === 0 ? (
              <div className="text-center py-6 sm:py-8 text-gray-500 px-4">
                <p className="text-sm sm:text-base">Aucun service trouvé</p>
                <p className="text-xs sm:text-sm">
                  {selectedCategory === 'all' 
                    ? 'Commencez par ajouter votre premier service'
                    : 'Aucun service dans cette catégorie'
                  }
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-[600px] ">
                  <TableHeader className='bg-gray-100'>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm min-w-[120px] ">Titre</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[100px]">Catégorie</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">Prix</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[90px]">Type</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">Durée</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">Statut</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[80px]">Items</TableHead>
                      <TableHead className="text-xs sm:text-sm min-w-[120px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium text-sm sm:text-base p-2 sm:p-4">
                          {service.title}
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs sm:text-sm">
                            {getCategoryName(service.category_service_id)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-green-600 text-sm sm:text-base p-2 sm:p-4">
                          {service.price}€
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Badge variant={service.type === 'automatic' ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                            {service.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm sm:text-base p-2 sm:p-4">{service.time} Jour(s)</TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Badge variant={service.status ? 'default' : 'secondary'} className="text-xs sm:text-sm">
                            {service.status ? 'Actif' : 'Inactif'}
                          </Badge>
                        </TableCell>
                        <TableCell className="p-2 sm:p-4">
                          <Badge variant="outline" className="text-purple-700 text-xs sm:text-sm">
                            {service.items?.length || 0} item(s)
                          </Badge>
                        </TableCell>
                        
                        <TableCell className="p-2 sm:p-4">
                          <div className="flex space-x-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleToggleStatus(service)}
                                  className="h-8 w-8 p-0"
                                >
                                  {service.status ? (
                                    <ToggleRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                                  ) : (
                                    <ToggleLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Bascule Actif/Inactif</p>
                              </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(service)}
                                  className="text-blue-600 border-blue-200 hover:bg-blue-50 h-8 w-8 p-0"
                                >
                                  <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Modifier le service</p>
                              </TooltipContent>
                            </Tooltip>
                            {/* <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(service)}
                                  className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
                                >
                                  <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Supprimer le service</p>
                              </TooltipContent>
                            </Tooltip> */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleManageItems(service)}
                                  className="text-purple-600 border-purple-200 hover:bg-purple-50 h-8 w-8 p-0"
                                >
                                  <Puzzle className="w-3 h-3 sm:w-4 sm:h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Gérer les items du service</p>
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

        <ServiceModal
          open={modalOpen}
          onClose={handleModalClose}
          onServiceSaved={handleServiceSaved}
          categories={categories}
          editingService={editingService}
        />

        {isMobile ? (
          <ServiceItemsMobileDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            service={selectedService}
          />
        ) : (
          <ServiceItemsDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            service={selectedService}
          />
        )}

        {/* <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer le service "{serviceToDelete?.title}" ? 
                Cette action est irréversible et supprimera également tous les items associés.
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
        </AlertDialog> */}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700 hidden md:block">
                Page {pagination.current_page} sur {pagination.last_page}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="perPage" className="text-sm text-gray-600">
                  Résultats par page:
                </label>
                <select
                  id="perPage"
                  value={pagination.per_page}
                  onChange={(e) => handlePerPageChange(Number(e.target.value))}
                  className="rounded-md border-gray-300 text-sm focus:border-[#BCADFC] focus:ring-[#BCADFC]"
                >
                  {PER_PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={pagination.current_page === 1}
                className={`p-2 rounded-md ${
                  pagination.current_page === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }>
                &lt;
              </button>
              {(() => {
                const totalPages = pagination.last_page;
                const currentPage = pagination.current_page;
                const pages: (number | string)[] = [];

                if (totalPages <= 5) {
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i);
                  }
                } else {
                  pages.push(1);
                  const startPage = Math.max(2, currentPage - 1);
                  const endPage = Math.min(totalPages - 1, currentPage + 1);
                  if (startPage > 2) pages.push('...');
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(i);
                  }
                  if (endPage < totalPages - 1) pages.push('...');
                  pages.push(totalPages);
                }

                return pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                    disabled={page === '...' || page === currentPage}
                    className={`px-3 py-1 rounded-md text-sm ${
                      page === '...'
                        ? 'text-gray-400 cursor-default'
                        : page === currentPage
                        ? 'bg-[#BCADFC] text-white cursor-default'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ));
              })()}
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={pagination.current_page === pagination.last_page}
                className={`p-2 rounded-md ${
                  pagination.current_page === pagination.last_page
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ServicesTab;
