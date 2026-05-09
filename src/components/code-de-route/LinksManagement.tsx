import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AddLinkModal } from "./AddLinkModal";
import { Plus, Trash } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import { fetchLinks, addLink, deleteLink, Link } from '@/api/admin/code';
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import Loader from '../common/Loader';

export const LinksManagement = () => {
  const { token } = useSelector((state: RootState) => state.authReducer);
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const loadLinks = async () => {
    try {
      setLoading(true);
      if (!token) return;
      const linksData = await fetchLinks(token);
      setLinks(linksData);
    } catch (error) {
        console.error("Erreur lors du chargement des liens :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async (linkUrl: string) => {
    try {
      if (!token) return;
      await addLink(token, linkUrl);
      setIsAddModalOpen(false);
      await loadLinks(); // Refresh the list
    } catch (error) {
        console.error("Erreur lors de l'ajout du lien :", error);
    }
  };

  const handleDeleteLink = async (id: number) => {
    try {
      if (!token) return;
      await deleteLink(token, id);
      await loadLinks(); // Refresh the list
    } catch (error) {
        if (error instanceof Error) {
            console.error("Erreur lors de la suppression du lien :", error.message);
        } else {
            console.error("Erreur lors de la suppression du lien :", error);
        }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  useEffect(() => {
    loadLinks();
  }, []);

  if (loading) {
    return (
      <>
        <Toaster position="top-right" />
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center h-32">
              <Loader/>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-blue-600 text-lg md:text-xl">Gestion des Liens</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Gérez les liens vers les ressources Code de la route
              </CardDescription>
            </div>
            {links.length === 0 && (
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1 md:mr-2" />
                <span className="text-xs md:text-sm">Ajouter un lien</span>
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-2 md:px-4">Lien</TableHead>
                  <TableHead className="px-2 md:px-4">Date</TableHead>
                  <TableHead className="px-2 md:px-4 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {links.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="px-2 md:px-4 max-w-[150px] md:max-w-md truncate">
                      <a 
                        href={link.liens} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline truncate block"
                      >
                        {link.liens}
                      </a>
                    </TableCell>
                    <TableCell className="px-2 md:px-4 whitespace-nowrap">
                      {formatDate(link.created_at)}
                    </TableCell>
                    <TableCell className="px-2 md:px-4 text-right">
                      <AlertDialog >
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 p-2">
                            <Trash className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-xs md:max-w-sm rounded-md">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                          <AlertDialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce lien ? Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDeleteLink(link.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
              {links.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                    Aucun lien ajouté pour le moment
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          </div>
        </CardContent>

        <AddLinkModal 
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
          onSubmit={handleAddLink}
        />
    </Card>
    </>
  );
};