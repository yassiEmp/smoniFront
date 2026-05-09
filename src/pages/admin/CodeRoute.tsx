import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LinksManagement } from "@/components/code-de-route/LinksManagement";
import { LearnersSubscriptions } from "@/components/code-de-route/LearnersSubscriptions";

const CodeRoute = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Code de la Route</h1>
          <p className="text-sm md:text-base text-gray-600 mt-1 md:mt-2">
            Gérez les liens et visualisez les abonnements des apprenants
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="links" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="links" className="text-xs md:text-sm flex items-center gap-1 md:gap-2">
              Liens Code
            </TabsTrigger>
            <TabsTrigger value="learners" className="text-xs md:text-sm flex items-center gap-1 md:gap-2">
              Abonnements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="links" className="mt-4 md:mt-6">
            <LinksManagement />
          </TabsContent>

          <TabsContent value="learners" className="mt-4 md:mt-6">
            <LearnersSubscriptions />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodeRoute;