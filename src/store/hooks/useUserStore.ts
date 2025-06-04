import { useStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { nameOfStorage, stateStorage } from '../storage';

interface UserInfoState {
  username: string;
  sex: string;
  age: number;
  avatar: string;
}

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  userInfo: UserInfoState | null;
  setToken: (accessToken: string, refreshToken: string) => void;
  setUserInfo: (info: UserInfoState) => void;
}

export const userStore = createStore<UserState>()(
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
    }),
    {
      name: nameOfStorage.user,
      storage: createJSONStorage(() => stateStorage),
    },
  ),
);
