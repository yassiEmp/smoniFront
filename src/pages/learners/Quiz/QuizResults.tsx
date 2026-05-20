import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { CheckCircle, XCircle, RotateCcw, Trophy, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import Header from '@components/generales/Header';
import Footer from '@components/generales/Footer';
import HomeNewStudentSection from '@components/generales/HomeNewStudentSection';

const QuizResults = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [resultsData] = useState<any>(location.state?.results || null);

  useEffect(() => {
    if (!resultsData) {
      toast.error('Résultats non disponibles. Veuillez recommencer le quiz.');
      navigate('/quiz');
    }
  }, [resultsData, navigate]);

  if (!resultsData) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow pt-40 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Backoffice Styled Main Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden mb-10">
            <div className={`h-2 w-full ${resultsData.passed ? 'bg-primary' : 'bg-red-600'}`} />

            <div className="p-10 text-center">
              <div className="mb-6 flex justify-center">
                <div className={`h-20 w-20 rounded-full flex items-center justify-center ${resultsData.passed ? 'bg-primary/10' : 'bg-red-100'}`}>
                  {resultsData.passed ? (
                    <Trophy className="h-10 w-10 text-primary" />
                  ) : (
                    <TrendingUp className="h-10 w-10 text-red-600" />
                  )}
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {resultsData.passed ? "Félicitations !" : "Encore un effort !"}
              </h1>

              <div className="flex flex-col items-center gap-2 mb-8 text-muted-foreground font-medium">
                <p>Vous avez obtenu un score de <span className={`text-2xl font-bold ${resultsData.passed ? 'text-primary' : 'text-red-600'}`}>{resultsData.score}/{resultsData.total_questions}</span></p>
                <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  {resultsData.category.name}
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Retour aux quiz
                </button>
                <button
                  onClick={() => navigate('/quiz')}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-8 py-3 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Choisir un autre quiz
                </button>
              </div>
            </div>
          </div>

          {/* Corrections List - Same as Dashboard History details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-foreground px-1">Correction du test</h2>
            {resultsData.details.map((detail: any, index: number) => (
              <div
                key={index}
                className={`rounded-lg border bg-card p-6 shadow-sm transition-shadow ${detail.is_correct ? 'border-primary/20' : 'border-red-100'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${detail.is_correct ? 'bg-primary/10 text-primary' : 'bg-red-100 text-red-600'}`}>
                    {detail.is_correct ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-4 text-foreground leading-tight">{detail.question_text}</h3>

                    <div className="grid gap-2">
                      {detail.options.map((option: string, optIndex: number) => (
                        <div
                          key={optIndex}
                          className={`p-3 rounded-md border text-sm transition-all ${optIndex === detail.correct_index
                            ? 'bg-primary/5 border-primary/20 text-primary font-bold'
                            : optIndex === detail.answerIndex && !detail.is_correct
                              ? 'bg-red-50 border-red-200 text-red-800'
                              : 'bg-card border-border text-muted-foreground'
                            }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {optIndex === detail.correct_index && (
                              <span className="text-[10px] uppercase font-black text-primary">Bonne réponse</span>
                            )}
                            {optIndex === detail.answerIndex && !detail.is_correct && (
                              <span className="text-[10px] uppercase font-black text-red-700">Votre réponse</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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

export default QuizResults;
