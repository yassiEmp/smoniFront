import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { fetchGraphData } from "@/api/graph";
import { MonthData } from "@/types/graph";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "@/components/common/Loader";
import { HeartOff } from "lucide-react";

const RevenueChart = () => {
  const token = useSelector((state: RootState) => state.authReducer.token);
  const [graphData, setGraphData] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();


  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      try {
        const response = await fetchGraphData(token);
        setGraphData(response.data);
      } catch (error) {
        console.error("Erreur graphique:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full rounded-xl bg-[#FAFAFA] p-4 min-h-[250px] flex items-center justify-center">
        <Loader size={32} showText={false} />
      </div>
    );
  }

  
  // Vérifie si toutes les valeurs sont à 0
  const hasNoData = graphData.every((month) => month.cash === 0);

  if (hasNoData) {
    return (
      <div className="w-full rounded-xl bg-[#FAFAFA] p-4 min-h-[250px]">
        <h3 className="mb-1 text-lg font-[600] leading-[140%] text-black">
          Évolution de vos revenus
        </h3>
        <p className="mb-4 text-sm text-[#616161]">12 mois de {currentYear}</p>

        <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
          <HeartOff size={48} className="mb-4 opacity-50" />
          <p className="text-center">Aucune donnée disponible pour le moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-[#FAFAFA] p-4">
      <h3 className="mb-1 text-lg font-[600] leading-[140%] text-black">
        Évolution de vos revenus
      </h3>
      <p className="mb-4 text-sm text-[#616161]">12 mois de {currentYear}</p>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={graphData} margin={{ top: 0, left: 0 }}>
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9E9E9E" }} />
          <YAxis
            tick={{ fontSize: 12, fill: "#9E9E9E" }}
            label={{
              value: "Montants (€)",
              angle: -90,
              position: "insideLeft", 
              fill: "#9E9E9E",
              fontSize: 13,
              dx: -10,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            }}
            formatter={(value: number) => [`${value} €`, ""]}
          />
          <Line
            type="monotone"
            dataKey="cash"
            stroke="#6C61F6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
