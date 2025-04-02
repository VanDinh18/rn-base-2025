import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV({
  id: 'my-app-storage',
  encryptionKey: 'some_encryption_key',
});

export const stateStorage: StateStorage = {
  setItem: (key, value) => {
    return storage.set(key, value);
  },
  getItem: key => {
    const value = storage.getString(key);
    return value ?? null;
  },
  removeItem: key => {
    return storage.delete(key);
  },
};

export const nameOfStorage = {
  user: 'user-storage',
};
