'use client';

import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function TermsPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            CarryDrop 이용약관
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>제1조 (목적)</h2>
            <p>이 약관은 CarryDrop 서비스 이용에 관한 조건 및 절차를 규정함을 목적으로 합니다.</p>

            <h2>제2조 (서비스 정의)</h2>
            <p>CarryDrop 서비스는 일본 내 짐 배송 및 보관 서비스를 의미합니다.</p>

            <h2>제3조 (이용자의 의무)</h2>
            <ul>
              <li>정확한 정보 제공</li>
              <li>안전한 짐 포장</li>
              <li>위험물품 신고</li>
            </ul>

            <h2>제4조 (서비스 제공자의 의무)</h2>
            <ul>
              <li>안전한 배송 서비스</li>
              <li>개인정보 보호</li>
              <li>손실/파손 시 배상</li>
            </ul>

            <h2>제5조 (요금 및 결제)</h2>
            <p>서비스 이용 요금은 웹사이트에 명시된 기준에 따라 부과됩니다.</p>

            <h2>제6조 (취소 및 환불)</h2>
            <p>픽업 2시간 전까지 100% 환불, 이후는 50% 환불됩니다.</p>

            <p className="text-sm text-gray-500 mt-8">
              시행일자: 2024년 1월 1일<br />
              최종 수정일: 2024년 11월 15일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 