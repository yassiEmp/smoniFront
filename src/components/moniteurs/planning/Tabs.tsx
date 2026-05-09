type TabsProps = {
  tab: 'recurrent' | 'special';
  setTab: (tab: 'recurrent' | 'special') => void;
};

export default function Tabs({ tab, setTab }: TabsProps) {
  return (
    <div className="flex gap-8 border-b border-gray-200 mb-2">
      <button
        className={`font-medium pb-2 px-2 border-b-2 transition-colors ${tab === 'recurrent' ? '' : 'text-gray-400 border-transparent'}`}
        style={tab === 'recurrent' ? { color: '#6C61F6', borderBottom: '2px solid #6C61F6' } : {}}
        onClick={() => setTab('recurrent')}
      >
        Programmes récurrents
      </button>
      <button
        className={`font-medium pb-2 px-2 border-b-2 transition-colors ${tab === 'special' ? '' : 'text-gray-400 border-transparent'}`}
        style={tab === 'special' ? { color: '#6C61F6', borderBottom: '2px solid #6C61F6' } : {}}
        onClick={() => setTab('special')}
      >
        Programmes spéciaux
      </button>
    </div>
  );
} 