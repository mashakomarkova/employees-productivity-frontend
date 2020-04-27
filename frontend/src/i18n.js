import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import translationEn from '../src/locales/en/translation.json';
import translationUa from '../src/locales/ua/translation.json';

const resources = {
    en: {
        translation: translationEn
    },
    ua: {
        translation: translationUa
    }
};

i18n
    .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "ua",

        keySeparator: false, // we do not use keys in form messages.welcome
        fallbackLng: "ua",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;