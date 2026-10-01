import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    // 1. Check if user previously made an explicit choice
    const saved = localStorage.getItem('portfolio_lang');
    if (saved === 'id' || saved === 'en') {
      return saved;
    }

    // 2. Default to device / browser language setting
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const primaryLang = (
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage ||
        'id'
      ).toLowerCase();
      return primaryLang.startsWith('id') ? 'id' : 'en';
    }

    return 'id';
  });

  const setLang = (newLang) => {
    if (newLang === 'id' || newLang === 'en') {
      setLangState(newLang);
      localStorage.setItem('portfolio_lang', newLang);
    }
  };

  const toggleLang = () => {
    const nextLang = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = translations[lang] || translations.id;

  return (
    <LanguageContext.Provider value={{ lang, language: lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
