import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { stateStorage, nameOfStorage } from '../storage';

interface UserInfoState {
  username: string;
  sex: string;
  age: number;
}

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfoState | null;
  setToken: (accessToken: string, refreshToken: string) => void;
  setUserInfo: (info: UserInfoState) => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      userInfo: null,

      setToken: (accessToken, refreshToken) =>
        set(() => ({
          accessToken,
          refreshToken,
        })),

      setUserInfo: info =>
        set(state => ({
          userInfo: { ...state.userInfo, ...info },
        })),
      isLoggedIn: () => get().accessToken !== null,
    }),
    {
      name: nameOfStorage.user,
      storage: createJSONStorage(() => stateStorage),
    },
  ),
);

export default useUserStore;
