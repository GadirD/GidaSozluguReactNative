import React, { createContext, useState } from "react";

export interface FoodItem {
  Id: number;
  Isim: string;
  ResimUrl: string;
  Tur: string;
  Mevsim: string;
  Aciklama: string;
  Fayda: string;
  Yorum: string;
  Notu: string;
  Tarif: string;
  Favori: boolean;
}

export const FoodContext = createContext<{
  foodData: FoodItem[];
  setFoodData: React.Dispatch<React.SetStateAction<FoodItem[]>>;
  refreshFlag: number;
  setRefreshFlag: React.Dispatch<React.SetStateAction<number>>;
}>({
  foodData: [],
  setFoodData: () => {},
  refreshFlag: 0,
  setRefreshFlag: () => {},
});

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);
  const [refreshFlag, setRefreshFlag] = useState<number>(0);

  return (
    <FoodContext.Provider
      value={{ foodData, setFoodData, refreshFlag, setRefreshFlag }}
    >
      {children}
    </FoodContext.Provider>
  );
};
