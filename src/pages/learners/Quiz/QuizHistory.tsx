import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Trophy, TrendingUp, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { getQuizHistory } from '@/api/learner/quiz';
import Header from '@components/generales/Header';
import Footer from '@components/generales/Footer';

interface AttemptHistory {
  id: number;
  category: {
    code: string;
    name: string;
  };
  score: number;
  total_questions: number;
  passed: boolean;
  completed_at: string;
}

const QuizHistory = () => {
  const [history, setHistory] = useState<AttemptHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    if (!token) {
      toast.error('Vous devez être connecté');
      navigate('/connexion');
      return;
    }

    try {
      const response = await getQuizHistory(token);
      setHistory(response.data.data);
    } catch (error) {
      toast.error('Erreur lors du chargement de l\'historique');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 70) return 'text-primary';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/quiz')}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux quiz
            </button>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">
              Historique des quiz
            </h1>
            <p className="text-muted-foreground">
              Consultez vos tentatives précédentes
            </p>
          </div>

          {/* Statistics */}
          {history.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-lg border bg-card shadow-sm p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Total tentatives</span>
                </div>
                <div className="text-3xl font-bold">{history.length}</div>
              </div>
              <div className="rounded-lg border bg-card shadow-sm p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Réussites</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  {history.filter((h) => h.passed).length}
                </div>
              </div>
              <div className="rounded-lg border bg-card shadow-sm p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Taux de réussite</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  {((history.filter((h) => h.passed).length / history.length) * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          )}

          {/* History List */}
          {history.length === 0 ? (
            <div className="rounded-lg border bg-card shadow-sm p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                <Trophy className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Aucun historique
              </h3>
              <p className="text-muted-foreground mb-6">
                Vous n'avez pas encore passé de quiz
              </p>
              <button
                onClick={() => navigate('/quiz')}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Commencer un quiz
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((attempt) => (
                <div
                  key={attempt.id}
                  className="rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {attempt.category.code}
                        </span>
                        {attempt.passed && (
                          <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                            ✓ Réussi
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {attempt.category.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(attempt.completed_at)}</span>
                      </div>
                    </div>

                    {/* Score Section */}
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${getScoreColor(
                            attempt.score,
                            attempt.total_questions
                          )}`}
                        >
                          {attempt.score}/{attempt.total_questions}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Score</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${getScoreColor(
                            attempt.score,
                            attempt.total_questions
                          )}`}
                        >
                          {((attempt.score / attempt.total_questions) * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Réussite</div>
                      </div>
                    </div>

                    {/* Action Button: Premium White Square Icon Box */}
                    <div className="flex items-center">
                      <button
                        onClick={() => navigate(`/quiz/results/${attempt.id}`)}
                        className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#2c2876] shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md hover:border-[#2c2876]/20 active:scale-95"
                        title="Voir détails"
                      >
                        <Eye className="w-5 h-5" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-[#2c2876] px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-sm">
                          Détails
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizHistory;
