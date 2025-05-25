import '../globals.css'; // Tailwind CSS 전역 스타일
import { SpeedInsights } from "@vercel/speed-insights/next";
import { dir } from 'i18next';
import { languages } from '../../i18n/settings';
import { useTranslation } from '../../i18n';
import LayoutComponent from '../components/Layout'; // 실제 Layout 컴포넌트
import React from 'react'; // React import
import { Metadata } from 'next';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: '캐리드롭',
  description: '캐리드롭 - 일본 당일 수하물 배송 서비스',
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'common');
  
  const translations = {
    nav_service_guide: t('nav_service_guide'),
    nav_accommodations: t('nav_accommodations'),
    nav_membership: t('nav_membership'),
    nav_reviews: t('nav_reviews'),
    login_button: t('login_button'),
    nav_request_delivery: t('nav_request_delivery'),
  };
  
  return (
    <html lang={lng} dir={lng === 'ar' || lng === 'he' ? 'rtl' : 'ltr'}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white">
        <LayoutComponent lng={lng} translations={translations}>
          {children}
        </LayoutComponent>
        <SpeedInsights />
      </body>
    </html>
  );
}
 