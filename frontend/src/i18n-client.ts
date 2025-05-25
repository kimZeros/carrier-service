'use client';

import i18next from 'i18next';
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions, languages } from './i18n/settings';

// 클라이언트에서만 실행되도록 보장
let isInitialized = false;

function initializeI18n() {
  if (isInitialized || typeof window === 'undefined') {
    return;
  }

  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((language: string, namespace: string) => 
      import(`./locales/${language}/${namespace}.json`)
    ))
    .init({
      ...getOptions(),
      lng: undefined, // 클라이언트에서 언어 감지
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
      },
      preload: [],
      interpolation: {
        escapeValue: false,
      },
    });

  isInitialized = true;
}

export function useTranslation(lng: string, ns?: string, options?: any) {
  // 클라이언트에서만 초기화
  if (typeof window !== 'undefined') {
    initializeI18n();
    
    if (i18next.resolvedLanguage !== lng) {
      i18next.changeLanguage(lng);
    }
  }
  
  return useTranslationOrg(ns, options);
} 