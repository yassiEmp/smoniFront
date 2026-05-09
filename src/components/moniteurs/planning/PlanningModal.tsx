import { ReactNode } from "react";

type PlanningModalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  header?: ReactNode;
  daysTabs?: ReactNode;
  scrollableContent?: ReactNode;
};

export default function PlanningModal({ open, onClose, children, header, daysTabs, scrollableContent }: PlanningModalProps) {
  if (!open) return null;
  if(children) console.log("hh")
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full p-6 relative animate-fade-in mx-5">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Fermer"
        >
          &times;
        </button>
        {header}
        {daysTabs}
        <div className="overflow-y-auto max-h-[70vh] pr-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* Pour Chrome, Safari et Opera */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
          `}</style>
          {scrollableContent}
        </div>
      </div>
    </div>
  );
} 