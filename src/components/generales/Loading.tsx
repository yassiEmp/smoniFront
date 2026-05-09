import Lottie from "lottie-react";
import loadingIcon from "@assets/lottie/loading.json";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div>
       <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40">
       <div className="flex flex-col items-center justify-center rounded-[12px] bg-slate-100 px-[24px] py-[32px]">
          <Lottie animationData={loadingIcon} />
          <p className="text-sm text-gray-600">Chargement des données...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
