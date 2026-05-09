import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CategoriesTab from './CategoriesTab';
import ServicesTab from './ServicesTab';

const ServiceManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('categories');

  return (
    <div className="min-h-screen  p-2 sm:p-4">
      <div className="max-w-8xl mx-auto pl-6">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Gestion des Services</h1>
          <p className="text-sm sm:text-base text-gray-600">Gérez les catégories, services et leurs éléments</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-[#463281] text-white rounded-t-lg p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Services & Catégories</CardTitle>
            <CardDescription className="text-blue-100 text-sm sm:text-base">
              Organisez et configurez votre offre de services
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-8xl mx-auto">
              <div className="overflow-x-auto max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 m-2 sm:m-6 mb-0 rounded-lg max-w-3xl mx-auto">
                  <TabsTrigger 
                    value="categories" 
                    className="data-[state=active]:bg-[#463281] data-[state=active]:text-white font-medium text-sm sm:text-base px-2 sm:px-4"
                  >
                    Catégories
                  </TabsTrigger>
                  <TabsTrigger 
                    value="services"
                    className="data-[state=active]:bg-[#463281] data-[state=active]:text-white font-medium text-sm sm:text-base px-2 sm:px-4"
                  >
                    Services
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-2 sm:p-6">
                <TabsContent value="categories" className="mt-0">
                  <CategoriesTab />
                </TabsContent>
                
                <TabsContent value="services" className="mt-0">
                  <ServicesTab />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceManagement;
