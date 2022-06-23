import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh_CN from './zh_CN.json'
import en_GB from './en_GB.json'

const code = localStorage.getItem('language') || 'en_GB';

const resources = {
    zh_CN: { translation: zh_CN },
    en_GB: { translation: en_GB },
};
i18n.use(initReactI18next)
    .init({
        resources,
        fallbackLng: code,
        detection: {
            caches: ['localStorage', 'sessionStorage', 'cookie'],
        }
    })

export default i18n