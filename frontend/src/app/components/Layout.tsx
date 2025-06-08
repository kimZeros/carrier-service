'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';
import CarryDropLogo from './CarryDropLogo';

interface LayoutProps {
  children: React.ReactNode;
  lng: string;
  translations: {
    nav_service_guide: string;
    nav_accommodations: string;
    nav_membership: string;
    nav_reviews: string;
    login_button: string;
    nav_request_delivery: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, lng, translations }) => {
  const pathname = usePathname();
  const isAdminPage = pathname?.includes('/admin');

  const navItems = [
    { href: 'service-guide', label: translations.nav_service_guide },
    { href: 'accommodation-guide', label: translations.nav_accommodations },
    { href: 'membership', label: translations.nav_membership },
    { href: 'reviews', label: translations.nav_reviews },
  ];

  // 연도를 고정값으로 사용하여 hydration 문제 방지
  const currentYear = 2024;

  // Admin page일 경우 헤더와 푸터 없이 children만 반환
  if (isAdminPage) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white text-gray-800 py-3 px-6 shadow-sm border-b border-gray-200">
        <nav className="container mx-auto flex justify-between items-center">
          <Link href={`/${lng}`} className="flex items-center">
            <CarryDropLogo size="md" showText={true} />
          </Link>
          
          <div className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={`/${lng}/${item.href}`} 
                className="text-gray-700 hover:text-red-500 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher lng={lng} />
            <Link 
              href={`/${lng}/login`} 
              className="text-gray-700 hover:text-red-500 font-medium transition-colors"
            >
              {translations.login_button}
            </Link>
            <Link 
              href={`/${lng}/request-delivery`} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
            >
              {translations.nav_request_delivery}
            </Link>
          </div>
        </nav>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* 회사 정보 */}
            <div>
              <div className="flex items-center mb-6">
                <CarryDropLogo size="sm" showText={false} className="mr-3" />
                <span className="text-xl font-bold">캐리드롭</span>
              </div>
              <p className="text-gray-400 mb-4">일본 여행, 짐 없이 자유롭게</p>
            </div>

            {/* 서비스 메뉴 */}
            <div>
              <h3 className="text-lg font-bold mb-6">서비스</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${lng}/service-guide`} className="text-gray-400 hover:text-white transition-colors">
                    서비스 소개
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/usage-guide`} className="text-gray-400 hover:text-white transition-colors">
                    이용 안내
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/airports`} className="text-gray-400 hover:text-white transition-colors">
                    지원 공항
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/hotels`} className="text-gray-400 hover:text-white transition-colors">
                    제휴 숙소
                  </Link>
                </li>
              </ul>
            </div>

            {/* 고객 지원 */}
            <div>
              <h3 className="text-lg font-bold mb-6">고객 지원</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${lng}/faq`} className="text-gray-400 hover:text-white transition-colors">
                    자주 묻는 질문
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/contact`} className="text-gray-400 hover:text-white transition-colors">
                    문의하기
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/terms`} className="text-gray-400 hover:text-white transition-colors">
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/privacy`} className="text-gray-400 hover:text-white transition-colors">
                    개인정보처리방침
                  </Link>
                </li>
              </ul>
            </div>

            {/* 회사 정보 */}
            <div>
              <h3 className="text-lg font-bold mb-6">회사 정보</h3>
              <ul className="space-y-3">
                <li>
                  <Link href={`/${lng}/about`} className="text-gray-400 hover:text-white transition-colors">
                    회사 소개
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/careers`} className="text-gray-400 hover:text-white transition-colors">
                    채용 정보
                  </Link>
                </li>
                <li>
                  <Link href={`/${lng}/partnership`} className="text-gray-400 hover:text-white transition-colors">
                    파트너십
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* 하단 저작권 */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © {currentYear} 캐리드롭. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 