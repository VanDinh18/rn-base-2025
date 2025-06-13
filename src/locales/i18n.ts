import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import en from './en';
import jp from './jp';

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: jp,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
