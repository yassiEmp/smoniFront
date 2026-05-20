import { useState } from 'react';
import { useNavigate } from 'react-router';
import { BookOpen, Car, Heart, Shield } from 'lucide-react';
import Header from '@components/generales/Header';
import Footer from '@components/generales/Footer';
import HomeNewStudentSection from '@components/generales/HomeNewStudentSection';

interface QuizCategory {
  id: number;
  code: string;
  name: string;
  description: string;
}

const quizCategories: QuizCategory[] = [
  { id: 1, code: 'VE', name: 'Vérifications Extérieures', description: 'Contrôles techniques externes.' },
  { id: 2, code: 'VI', name: 'Vérifications Intérieures', description: 'Commandes et habitacle.' },
  { id: 3, code: 'QSER', name: 'Sécurité Routière', description: 'Règles et comportements.' },
  { id: 4, code: 'PS', name: 'Premiers Secours', description: 'Gestes d\'urgence.' }
];

const QuizCategories = () => {
  const [categories] = useState<QuizCategory[]>(quizCategories);
  const navigate = useNavigate();

  const getCategoryIcon = (code: string) => {
    const iconClass = "w-6 h-6 text-indigo-700";
    switch (code) {
      case 'VI': return <Shield className={iconClass} />;
      case 'VE': return <Car className={iconClass} />;
      case 'QSER': return <BookOpen className={iconClass} />;
      case 'PS': return <Heart className={iconClass} />;
      default: return <BookOpen className={iconClass} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Quiz de Vérification</h1>
            <p className="text-slate-500">Sélectionnez une catégorie pour tester vos connaissances gratuitement.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col items-center p-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 mb-6">
                  {getCategoryIcon(category.code)}
                </div>

                <h3 className="font-bold text-xl text-slate-900 mb-4">{category.name}</h3>
                <p className="text-sm text-slate-500 mb-8 flex-grow">{category.description}</p>

                <button
                  onClick={() => navigate(`/quiz/${category.code}`)}
                  className="w-full h-12 inline-flex items-center justify-center rounded-xl bg-indigo-700 font-bold text-white transition-all hover:bg-indigo-800"
                >
                  Démarrer
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      <HomeNewStudentSection />
      <Footer />
    </div>
  );
};

export default QuizCategories;
