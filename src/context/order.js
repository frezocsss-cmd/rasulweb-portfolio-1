import { createContext, useContext } from "react";

export const OrderContext = createContext(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) {
    return { openOrder: () => {}, closeOrder: () => {}, isOpen: false, selectedPackage: null };
  }
  return ctx;
}
