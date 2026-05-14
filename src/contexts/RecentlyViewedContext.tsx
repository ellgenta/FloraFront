import { createContext, useContext, useState, type ReactNode } from "react";

interface RecentlyViewedContextType {
  lastViewedProductId: string | null;
  setLastViewedProductId: (id: string | number | null) => void;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [lastViewedProductId, setLastViewedProductIdState] = useState<
    string | null
  >(null);

  const setLastViewedProductId = (id: string | number | null) => {
    setLastViewedProductIdState(id === null ? null : String(id));
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        lastViewedProductId,
        setLastViewedProductId,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  }

  return context;
}