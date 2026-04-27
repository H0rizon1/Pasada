import { createContext, useContext, useState } from "react";
import { translations } from "./translations";

type Language = 'en' | 'fil';

type LanguageContextType = {
    language: Language;
    toggleLanguage: () => void;
    t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    toggleLanguage: () => {},
    t: translations.en,
});

export function LanguageProvider({ children }: {children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'en' ? 'fil' : 'en'));
    };
    return (
        <LanguageContext.Provider
            value={{ language, toggleLanguage, t: translations[language]}} >
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);