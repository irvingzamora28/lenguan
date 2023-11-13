import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import enTranslations from "./locales/en/translation.json";
import esTranslations from "./locales/es/translation.json";
import enListeningExercise from "./locales/en/listening-exercise.json";
import esListeningExercise from "./locales/es/listening-exercise.json";

i18n.use(HttpBackend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		debug: true,
		detection: {
			order: ["queryString", "cookie", "localStorage", "path", "subdomain"],
			caches: ["cookie"],
		},
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
		resources: {
			en: {
				translation: enTranslations,
				listening_exercise: enListeningExercise,
			},
			es: {
				translation: esTranslations,
				listening_exercise: esListeningExercise,
			},
		},
		ns: ["translation", "listening_exercise"],
		defaultNS: "translation",
	});

export default i18n;
