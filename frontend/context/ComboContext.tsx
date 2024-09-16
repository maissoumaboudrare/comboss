"use client"
import React, { createContext, useContext, useState, useCallback } from "react";
import { Combo } from "@/types/combo";
import { fetchCombos } from "@/utils/api";

type CombosContextType = {
  combos: Combo[];
  updateCombos: (updatedCombos: Combo[]) => void;
  fetchAndSetCombos: (characterID: number) => void;
};

const CombosContext = createContext<CombosContextType | undefined>(undefined);

export const CombosProvider = ({ children }: { children: React.ReactNode }) => {
  const [combos, setCombos] = useState<Combo[]>([]);

  const updateCombos = (updatedCombos: Combo[]) => {
    setCombos(updatedCombos);
  };

  const fetchAndSetCombos = useCallback(async (characterID: number) => {
    try {
      const data = await fetchCombos(characterID);
      setCombos(data);
    } catch (error) {
      console.error("Error fetching combos:", error);
    }
  }, []);

  return (
    <CombosContext.Provider value={{ combos, updateCombos, fetchAndSetCombos }}>
      {children}
    </CombosContext.Provider>
  );
};

export const useCombos = () => {
  const context = useContext(CombosContext);
  if (context === undefined) {
    throw new Error("useCombos must be used within a CombosProvider");
  }
  return context;
};