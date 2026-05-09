import { BoutiqueService } from "@/api/boutique/types";
import { CheckCircle, XCircle } from 'lucide-react';

const LocationPricingCardTwo = ({ item, onBuy }: { item: BoutiqueService, onBuy: (amount: number, serviceId: number) => void }) => {
    return (
        <div className="bg-white max-w-[910px]  p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
            <div className="flex justify-between">
                {item.items && item.items.length > 0 ? (
                    <div>
                        <ul className="mt-4 space-y-2 text-[13px] font-semibold ">
                            {item.items.map((element, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {element.status ? (
                                        <CheckCircle className="text-indigo-500 w-4 h-4" />
                                    ) : (
                                        <XCircle className="text-red-500 w-4 h-4" />
                                    )}
                                    {element.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}

                <div className={`flex flex-col items-center justify-between ${item.items && item.items.length ? 'mt-6' : 'mt-0'} `}>
                    <div className={` font-bold text-indigo-500 ${!item.items || !item.items.length ? 'mb-2 text-3xl' : 'mb-0 text-2xl'}`}>{item.price}€</div>
                    <button className="bg-black text-white px-4 py-2 rounded-lg md:text-[13px] font-semibold text-[10px] hover:bg-gray-900 transition" onClick={() => onBuy(item.price, item.id)}>
                        Souscrire →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationPricingCardTwo;