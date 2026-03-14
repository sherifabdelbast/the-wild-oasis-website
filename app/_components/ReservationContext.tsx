"use client";

import { createContext, useContext, useState } from "react";

const ReservationContext = createContext<
  | {
      range: { from: Date | undefined; to: Date | undefined };
      setRange: React.Dispatch<
        React.SetStateAction<{ from: Date | undefined; to: Date | undefined }>
      >;
      resetRange: () => void;
    }
  | undefined
>(undefined);

const initialState: { from: Date | undefined; to: Date | undefined } = {
  from: undefined,
  to: undefined,
};

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside the provider");

  return context;
}

export { ReservationProvider, useReservation };
