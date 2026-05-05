import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { sampleData } from "../constants/sampleData";
import { MarketplaceData } from "../types";

type MarketplaceContextValue = {
  data: MarketplaceData;
  resetDemoData: () => Promise<void>;
};

const STORAGE_KEY = "verified_staffing_marketplace_data";
const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined);

export function MarketplaceProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<MarketplaceData>(sampleData);

  useEffect(() => {
    async function hydrate() {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
      }
    }

    hydrate();
  }, []);

  async function resetDemoData() {
    setData(sampleData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
  }

  const value = useMemo(() => ({ data, resetDemoData }), [data]);

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const value = useContext(MarketplaceContext);
  if (!value) {
    throw new Error("useMarketplace must be used inside MarketplaceProvider");
  }
  return value;
}
