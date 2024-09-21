import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  // clearToken: () => void;
}

const useStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      setToken: (token) => set({ token }),
      // clearToken: () => set({ token: "" }),
    }),
    {
      name: "auth-storage",
      // getStorage: () => localStorage,
    }
  )
);

export default useStore;
