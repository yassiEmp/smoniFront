import  { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Eye } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import { fetchSubscriptions, Subscription, SubscriptionsPagination } from '@/api/admin/code';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { useNavigate } from "react-router-dom";
import Loader from '../common/Loader';
import { imageUrl } from "@/api";
import { formatFrenchDate } from '@/utils/dateUtils';

const PER_PAGE_OPTIONS = [10, 20, 50];

export const LearnersSubscriptions = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
const navigate = useNavigate();

  const loadSubscriptions = async (page: number = 1, per_page: number = pagination.per_page) => {
    if (!token) return;
    try {
      setLoading(true);
      const data: SubscriptionsPagination = await fetchSubscriptions(token, page);
      setSubscriptions(data.data);
      setPagination({
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total,
      });
    } catch {
      setSubscriptions([]);
      setPagination({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };

  const handlePerPageChange = (perPage: number) => {
    setPagination((prev) => ({ ...prev, per_page: perPage, current_page: 1 }));
  };

  useEffect(() => {
    loadSubscriptions(pagination.current_page, pagination.per_page);
    // eslint-disable-next-line
  }, [token, pagination.current_page, pagination.per_page]);

  // const formatPeriod = (startDate: string, endDate: string) => {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   return `${start.getDate().toString().padStart(2, '0')}/${(start.getMonth() + 1).toString().padStart(2, '0')} - ${end.getDate().toString().padStart(2, '0')}/${(end.getMonth() + 1).toString().padStart(2, '0')}`;
  // };

  const getStatusBadge = (status: string) => {
    if (status === 'active' || status === 'actif') {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>;
    }
    return <Badge variant="secondary" className="bg-red-100 text-red-800">Expiré</Badge>;
  };

 return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardHeader>
          <CardTitle className="text-primary text-lg md:text-xl">Abonnements des Apprenants</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Liste des apprenants ayant souscrit au service Packcode
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[800px] md:min-w-full">
              <TableHeader className="bg-gray-100 ">
                <TableRow>
                  <TableHead className="whitespace-nowrap font-semibold">Apprenant</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Téléphone</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Service</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold ">Montant</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold ">Période</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Transaction ID</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Infos</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold ">Mode</TableHead>
                  <TableHead className="whitespace-nowrap font-semibold">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
               {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center h-16">
                      <Loader />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : subscriptions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      Aucun abonnement trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                subscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      <div className="flex items-center">
                                             <div className="h-10 w-10 flex-shrink-0">
                                               {subscription.learner.photo ? (
                                                 <img
                                                   src={`${imageUrl}${subscription.learner.photo}`}
                                                   alt={`${subscription.learner.firstname} ${subscription.learner.lastname}`}
                                                   className="h-10 w-10 rounded-full object-cover"
                                                 />
                                               ) : (
                                                 <div className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-lg font-semibold text-white">
                                                   {`${subscription.learner.lastname?.charAt(0) ?? ''}${subscription.learner.firstname?.charAt(0) ?? ''}`}
                                                 </div>
                                               )}
                                             </div>
                                             <div className="ml-4">
                                               <div className="text-sm font-medium text-gray-900">
                                                 {`${subscription.learner.firstname} ${subscription.learner.lastname}`}
                                               </div>
                                               <div className="text-sm text-gray-500">
                                                 @{subscription.learner.email}
                                               </div>
                                             </div>
                                           </div>
                    </TableCell>
                  
                    <TableCell className="whitespace-nowrap">
                      <a href={`tel:${subscription.learner.phone}`} className="text-blue-600 hover:underline">
                        {subscription.learner.phone}
                      </a>    
                    </TableCell>
                    
                 


                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-sm">{subscription.service.title}</span>
                        {subscription.service.items && Array.isArray(subscription.service.items) && subscription.service.items.length > 0 && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-3 w-3 md:h-4 md:w-4 text-gray-400 hover:text-blue-600" />
                              </TooltipTrigger>
                               <TooltipContent>
                                  <div className="space-y-1">
                                    <p className="font-semibold">Inclus dans le service:</p>
                                    {subscription.service.items.map(item => (
                                      <p className="text-sm" key={item.id}>• {item.label}</p>
                                    ))}
                                  </div>
                                </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold whitespace-nowrap">
                      {parseFloat(subscription.amount).toFixed(0)}€
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-xs md:text-sm">
                  {formatFrenchDate(subscription.start_date)} - {formatFrenchDate(subscription.end_date)}
                </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <code className="text-xs bg-gray-100 px-1 py-0.5 md:px-2 md:py-1 rounded ">
                        {subscription.transaction_id}
                      </code> 
                    </TableCell>
                     <TableCell className="whitespace-nowrap">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                          onClick={() => navigate(`/admin/apprenants/${subscription.learner.id}`)}
                          title="Voir fiche de l'apprenant"
                        >
                          <Eye className='w-5 h-5' />
                        </button>  
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge variant="outline" className="text-xs md:text-sm">
                        {subscription.mode}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {getStatusBadge(subscription.status)}
                    </TableCell>
                  </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="px-2 md:px-6 py-3 md:py-4 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="text-xs md:text-sm text-gray-700">
                  Page {pagination.current_page} sur {pagination.last_page}
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <label htmlFor="perPage" className="text-xs md:text-sm text-gray-600">
                    Par page:
                  </label>
                  <select
                    id="perPage"
                    value={pagination.per_page}
                    onChange={(e) => handlePerPageChange(Number(e.target.value))}
                    className="rounded-md border-gray-300 text-xs md:text-sm focus:border-[#BCADFC] focus:ring-[#BCADFC] py-1"
                  >
                    {PER_PAGE_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={pagination.current_page === 1}
                  className={`p-1 md:p-2 rounded-md text-xs md:text-sm ${
                    pagination.current_page === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
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
                  className={`p-1 md:p-2 rounded-md text-xs md:text-sm ${
                    pagination.current_page === pagination.last_page
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};