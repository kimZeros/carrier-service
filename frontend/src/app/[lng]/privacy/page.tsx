'use client';

import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function PrivacyPage({ params }: PageProps) {
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
            개인정보 처리방침
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. 개인정보의 처리 목적</h2>
            <p>CarryDrop은 다음의 목적을 위하여 개인정보를 처리합니다:</p>
            <ul>
              <li>서비스 이용자 식별 및 인증</li>
              <li>배송 서비스 제공</li>
              <li>고객 상담 및 문의 응답</li>
              <li>서비스 개선 및 신규 서비스 개발</li>
            </ul>

            <h2>2. 개인정보의 처리 및 보유 기간</h2>
            <p>개인정보는 수집 목적 달성 시까지 보유하며, 관련 법령에 따라 일정 기간 보관합니다.</p>

            <h2>3. 처리하는 개인정보의 항목</h2>
            <ul>
              <li>필수항목: 이름, 연락처, 이메일, 배송지 정보</li>
              <li>선택항목: 생년월일, 성별</li>
              <li>자동수집: IP주소, 쿠키, 서비스 이용기록</li>
            </ul>

            <h2>4. 개인정보의 제3자 제공</h2>
            <p>이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.</p>

            <h2>5. 개인정보처리 위탁</h2>
            <p>배송업무를 위해 제휴업체에 필요 최소한의 정보만 제공합니다.</p>

            <h2>6. 이용자의 권리·의무 및 행사방법</h2>
            <p>이용자는 언제든지 개인정보 열람, 정정, 삭제, 처리정지를 요구할 수 있습니다.</p>

            <h2>7. 개인정보의 안전성 확보조치</h2>
            <p>개인정보보호법에 따라 암호화, 접근제한 등의 기술적/관리적 보호조치를 시행합니다.</p>

            <p className="text-sm text-gray-500 mt-8">
              시행일자: 2024년 1월 1일<br />
              최종 수정일: 2024년 11월 15일<br />
              문의처: privacy@carrydrop.co.kr
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 