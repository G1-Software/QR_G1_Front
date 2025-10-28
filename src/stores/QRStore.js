import { create } from "zustand";

export const useQrStore = create((set) => ({
  qrData: null,
  setQrData: (data) => set({ qrData: data }),
  clearQrData: () => set({ qrData: null }),
}));
