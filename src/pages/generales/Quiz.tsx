import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Shield, BookOpen, Heart, ArrowRight, Zap, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router';
import Header from '@components/generales/Header';
import Footer from '@components/generales/Footer';
import HomeNewStudentSection from '@components/generales/HomeNewStudentSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PageHead from '@components/SEO/PageHead';

const quizCategories = [
  {
    code: 'VE',
    name: 'Vérifications Extérieures',
    description: 'Testez vos connaissances sur les vérifications extérieures du véhicule',
    id: 1
  },
  {
    code: 'VI',
    name: 'Vérifications Intérieures',
    description: 'Maîtrisez les vérifications intérieures et les commandes du véhicule',
    id: 2
  },
  {
    code: 'QSER',
    name: 'Questions de Sécurité Routière',
    description: 'Évaluez vos connaissances en sécurité routière et les équipements',
    id: 3
  },
  {
    code: 'PS',
    name: 'Premiers Secours',
    description: 'Apprenez les gestes qui sauvent en cas d\'accident',
    id: 4
  }
];

const Quiz = () => {
  const navigate = useNavigate();

  const handleStartQuiz = (code: string) => {
    navigate(`/quiz/${code}`);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <PageHead
        title="Quiz permis - Verifications & securite routiere | Smoni"
        description="Testez gratuitement vos connaissances : verifications interieures, exterieures et questions de securite routiere pour reussir l'examen du permis B."
        canonicalPath="/quiz"
      />
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 px-4 overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50 opacity-60" />
          <div className="absolute top-24 left-10 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-48 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          <div className="relative max-w-7xl mx-auto text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge variant="outline" className="mb-6 border-indigo-200 text-indigo-700 bg-indigo-50/50 text-sm px-6 py-1.5 font-semibold">
                <Zap className="w-4 h-4 mr-2 inline" />
                Entraînement Gratuit
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#1e1b4b] mb-6 leading-tight tracking-tight">
                Quiz du Permis <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">de Conduire</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 mb-8 max-w-3xl mx-auto font-medium">
                Préparez-vous avec nos séries de tests thématiques conformes à l'examen officiel.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 px-4 bg-slate-50/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quizCategories.map((category) => (
              <Card key={category.code} className="border border-slate-200 bg-white hover:border-indigo-300 transition-all shadow-sm flex flex-col h-full">
                <CardHeader className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 mb-4">
                    {category.code === 'VE' && <Car className="w-6 h-6 text-indigo-700" />}
                    {category.code === 'VI' && <Shield className="w-6 h-6 text-indigo-700" />}
                    {category.code === 'QSER' && <BookOpen className="w-6 h-6 text-indigo-700" />}
                    {category.code === 'PS' && <Heart className="w-6 h-6 text-indigo-700" />}
                  </div>
                  <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button onClick={() => handleStartQuiz(category.code)} className="w-full bg-indigo-700 hover:bg-indigo-800 text-white font-semibold">
                    Commencer le Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <HomeNewStudentSection />
      </main>

      <Footer />
    </div>
  );
};

export default Quiz;
