import { createContext, useContext, useState, type ReactNode } from 'react';

interface RecentlyViewedContextType {
  lastViewedProductId: string | null;
  setLastViewedProductId: (id: string | null) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [lastViewedProductId, setLastViewedProductId] = useState<string | null>(null);

  return (
    <RecentlyViewedContext.Provider value={{ lastViewedProductId, setLastViewedProductId }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);

  if (!context) {
    throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider');
  }

  return context;
}