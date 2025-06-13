import 'i18next';

import en from './en';
import jp from './jp';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof en;
      jp: typeof jp;
    };
  }
}
