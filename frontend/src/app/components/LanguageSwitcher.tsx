'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { languages } from '../../i18n/settings';

const languageNames: { [key: string]: string } = {
  en: 'English',
  ko: '한국어',
  ja: '日本語'
};

interface LanguageSwitcherProps {
  lng: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ lng }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLng: string) => {
    if (newLng === lng) return;
    
    // 현재 경로에서 언어 부분만 변경
    const segments = pathname.split('/');
    segments[1] = newLng; // 첫 번째 세그먼트가 언어
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <div className="relative">
      <select
        value={lng}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block p-2.5"
      >
        {languages.map((language) => (
          <option key={language} value={language}>
            {languageNames[language] || language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher; 