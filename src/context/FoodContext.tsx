import React, { createContext, useState, useEffect } from "react";

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
}>({
  foodData: [],
  setFoodData: () => {},
});

export const FoodProvider = ({ children }: { children: React.ReactNode }) => {
  const [foodData, setFoodData] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch("http://192.168.1.104:8000/api/fooditems/")
      .then((res) => res.json())
      .then(setFoodData)
      .catch(console.error);
  }, []);

  return (
    <FoodContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodContext.Provider>
  );
};
