import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import i18n from './locales/i18n';
import {
  queryClient,
  queryPersisterOptions,
  useQueryAppListener,
} from './utils/useQuerySetup';
import { RootNavigation } from './navigator';

import '../global.css';

const App = () => {
  useQueryAppListener();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={queryPersisterOptions}
          >
            <I18nextProvider i18n={i18n}>
              <RootNavigation />
            </I18nextProvider>
          </PersistQueryClientProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
