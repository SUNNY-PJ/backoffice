import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProfileState {
  profile: any;
  setProfile: (profile: any) => void;
}

const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: "",
      setProfile: (profile) => set({ profile }),
    }),
    {
      name: "my-profile",
    }
  )
);

export default useProfileStore;
