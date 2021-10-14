import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import English from "languages/locales/en.json";
import Spanish from "languages/locales/es.json";
import German from "languages/locales/de.json";
import Italian from "languages/locales/it.json";

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    // keySeparator: false,
    // debug: true,
    resources: {
      en: English,
      es: Spanish,
      de: German,
      it: Italian
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
