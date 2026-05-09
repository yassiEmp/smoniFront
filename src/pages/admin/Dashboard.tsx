// import Driver from "@assets/dashboard-moniteur/Citydriver-pana.png";
// import Winners from "@assets/dashboard-moniteur/Winners-pana.png";
// import Cours from "@components/moniteurs/Cours";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { useEffect, useState } from "react";
import { getStatesAdmin, getGraphAdmin, getGraphWithdrawalYear } from "@/api/admin/dashboard";
import { Users, PiggyBank, Eye, EyeClosed } from "lucide-react";
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import Loader from "@/components/common/Loader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MONTHS_FR = {
  January: "Janvier",
  February: "Février",
  March: "Mars",
  April: "Avril",
  May: "Mai",
  June: "Juin",
  July: "Juillet",
  August: "Août",
  September: "Septembre",
  October: "Octobre",
  November: "Novembre",
  December: "Décembre"
};

function formatRevenue(value: number | string): string {
  if (typeof value === "string") {
    // 尝试转换为数字
    const num = Number(value.replace(/\s/g, '').replace(/,/g, '').replace(/€/g, ''));
    if (isNaN(num)) return value;
    value = num;
  }

  if (typeof value !== "number") return value as string;

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(2).replace(/\.00$/, '') + "B";
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(2).replace(/\.00$/, '') + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(2).replace(/\.00$/, '') + "K";
  } else {
    return value.toString();
  }
}

const Dashboard = () => {
  const { user, token } = useSelector((state: RootState) => state.authReducer);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [graphData, setGraphData] = useState<any>(null);
  const [loadingGraph, setLoadingGraph] = useState(true);
  const [showRevenue, setShowRevenue] = useState(false);
  const [withdrawalGraph, setWithdrawalGraph] = useState<any>(null);
  const [loadingWithdrawalGraph, setLoadingWithdrawalGraph] = useState(true);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getStatesAdmin(token);
        setStats(data.data);
      } catch (e) {
        console.error("Erreur lors de la récupération des statistiques :", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);


  useEffect(() => {
    const fetchGraph = async () => {
      setLoadingGraph(true);
      try {
        const data = await getGraphAdmin(token);
        setGraphData({
          labels: [
            'En attente',
            'Confirmé',
            'Planifié',
            'Noté',
            'Annulé',
            'Terminé'
          ],
          datasets: [
            {
              label: 'Nombre de rendez-vous',
              data: [
                data.pending,
                data.confirmed,
                data.scheduled,
                data.notation,
                data.cancelled,
                data.completed
              ],
              backgroundColor: '#6C61F6',
              borderRadius: 8,
            }
          ]
        });
      } finally {
        setLoadingGraph(false);
      }
    };
    fetchGraph();
  }, [token]);


  useEffect(() => {
    setLoadingWithdrawalGraph(true);
    const fetchWithdrawalGraph = async () => {
      try {
        const response = await getGraphWithdrawalYear(year.toString(), token);
        const apiData = response.data || [];
        const labels = apiData.map(
          (item: any) => MONTHS_FR[item.month_name as keyof typeof MONTHS_FR] || item.month_name
        );
        const data = apiData.map((item: any) => item.total_ammount);
        setWithdrawalGraph({
          labels,
          datasets: [
            {
              label: "Somme des transactions (€)",
              data,
              backgroundColor: "#F6C261",
              borderRadius: 8,
            }
          ]
        });
      } catch (e) {
        setWithdrawalGraph(null);
      } finally {
        setLoadingWithdrawalGraph(false);
      }
    };
    fetchWithdrawalGraph();
  }, [token, year]);


  return (
    <div className="relative h-full bg-[#F5F5F5]">
      <div>
        <div>
          <div className="flex flex-col justify-between space-y-10 px-[32px] pt-[48px] md:flex-row md:space-y-0">
            <div className="space-y-[4px]">
              <h1 className="text-[30px] font-semibold leading-[120%]">
                Dashboard
              </h1>
              <p className="leading-[140%] text-[#616161]">
                Bienvenu {user.firstname}
              </p>
            </div>
          </div>

          <div className="pl-[32px]">
            <div>
              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
                {/* Total admins */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4 shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Total admins</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[48px] font-medium">
                      {loading ? "..." : (stats?.admin ? stats.admin : "0")}
                    </span>
                    <Users size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
                {/* Total apprenants */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4 shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Total apprenants</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[48px] font-medium">
                      {loading ? "..." : (stats?.learner ? stats.learner : "0")}
                    </span>
                    <Users size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4 shadow-sm">
                  <div className="flex justify-start items-center mb-2">
                    <span className="text-black text-base font-semibold">Total instructeurs</span>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[48px] font-medium">
                      {loading ? "..." : (stats?.instructor ? stats.instructor : "0")}
                    </span>
                    <Users size={32} className="text-[#6C61F6]" />
                  </div>
                </div>

                {/* Chiffre d'affaires */}
                <div className="flex flex-col justify-between border-[#E0E0E0] border-[0.5px] rounded-[8px] min-h-[150px] bg-white px-6 pt-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-black text-base font-semibold">Chiffre d'affaires</span>
                    <button
                      className="ml-2 text-xs text-[#6C61F6] underline flex items-center"
                      onClick={() => setShowRevenue(v => !v)}
                    >
                      {showRevenue ? (
                        <>
                          <EyeClosed size={25} className="ml-1" />
                        </>
                      ) : (
                        <>
                          <Eye size={25} className="ml-1" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex justify-between items-center gap-2 mt-6">
                    <span className="text-[40px] font-medium select-none">
                      {loading
                        ? "..."
                        : showRevenue
                          ? (stats?.cash
                              ? formatRevenue(stats.cash) + "€"
                              : "0€")
                          : "••••••"}
                    </span>
                    <PiggyBank size={32} className="text-[#6C61F6]" />
                  </div>
                </div>
                {/* Ajoute ici d'autres cards si tu as d'autres stats à afficher */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Graphique en bâtonnets Chart.js */}
              <div className="bg-white rounded-lg shadow p-6 mt-8">
                <h3 className="text-lg font-semibold mb-4">Statut des rendez-vous</h3>
                {loadingGraph ? (
                    <div className="flex justify-center items-center h-full w-full"><Loader /></div>
                ) : (
                  <Bar
                    data={graphData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: false },
                        title: { display: false },
                      },
                      scales: {
                        y: { beginAtZero: true }
                      }
                    }}
                      height={200}
                  />
                )}
              </div>

                {/* Graphique statique : Transactions mensuelles */}
                <div className="bg-white rounded-lg shadow p-6 mt-8">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold mb-4">Transactions mensuelles</h3>
                    <div className="flex items-center gap-3 mb-4">
                      <label htmlFor="year-select" className="text-sm font-semibold text-gray-700">
                        Année :
                      </label>
                      <div className="relative">
                        <select
                          id="year-select"
                          value={year}
                          onChange={e => setYear(Number(e.target.value))}
                          className="block w-full appearance-none border border-gray-300 rounded-md bg-white px-4 py-2 pr-10 text-gray-900 focus:border-[#6C61F6] focus:ring-2 focus:ring-[#6C61F6] transition font-medium shadow-sm"
                        >
                          {[...Array(5)].map((_, idx) => {
                            const y = currentYear - idx;
                            return <option key={y} value={y}>{y}</option>;
                          })}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {loadingWithdrawalGraph ? (
                    <div className="flex justify-center items-center h-full w-full"><Loader /></div>
                  ) : withdrawalGraph ? (
                    <Bar
                      data={withdrawalGraph}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: { display: false },
                          title: { display: false },
                        },
                        scales: {
                          y: { beginAtZero: true }
                        }
                      }}
                      height={200}
                    />
                  ) : (
                    <div className="text-center text-gray-500">Aucune donnée</div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
