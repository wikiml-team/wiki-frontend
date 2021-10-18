import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import english from "languages/resources/en";
import spanish from "languages/resources/es";
import german from "languages/resources/de";
import italian from "languages/resources/it";

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    // debug: true,
    resources: {
      en: english,
      es: spanish,
      de: german,
      it: italian
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
