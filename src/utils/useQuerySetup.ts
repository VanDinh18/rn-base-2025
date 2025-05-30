import { AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { focusManager, QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProviderProps } from '@tanstack/react-query-persist-client';

import { useAppState } from '@/hooks/useAppState';
import { useOnlineManager } from '@/hooks/useOnlineManager';

const queryClient = new QueryClient();

const storage = new MMKV({ id: 'react-query' });

const clientStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

const queryPersister = createSyncStoragePersister({
  storage: clientStorage,
});

const queryPersisterOptions: PersistQueryClientProviderProps['persistOptions'] =
  {
    persister: queryPersister,
  };

const useQueryAppListener = () => {
  function onAppStateChange(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  useAppState(onAppStateChange);

  useOnlineManager();
};

export { queryClient, queryPersisterOptions, useQueryAppListener };
