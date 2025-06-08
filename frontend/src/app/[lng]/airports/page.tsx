'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function AirportsPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const airports = [
    {
      name: '간사이 국제공항',
      nameEn: 'Kansai International Airport',
      code: 'KIX',
      city: '오사카',
      region: '간사이',
      available: true,
      features: ['24시간 서비스', '한국어 지원', '당일 배송'],
      terminals: ['제1터미널', '제2터미널'],
      pickupTime: '도착 후 30분 이내',
      deliveryAreas: ['오사카시', '교토시', '나라시', '고베시'],
      price: '₩35,000~',
      image: '🛫',
      description: '오사카의 관문, 24시간 서비스 가능'
    },
    {
      name: '나리타 국제공항',
      nameEn: 'Narita International Airport',
      code: 'NRT',
      city: '도쿄',
      region: '간토',
      available: true,
      features: ['Express 서비스', '대용량 짐', '실시간 추적'],
      terminals: ['제1터미널', '제2터미널', '제3터미널'],
      pickupTime: '도착 후 45분 이내',
      deliveryAreas: ['도쿄 23구', '요코하마시', '치바시'],
      price: '₩45,000~',
      image: '✈️',
      description: '도쿄의 주요 관문, 최대 규모'
    },
    {
      name: '하네다 공항',
      nameEn: 'Tokyo Haneda Airport',
      code: 'HND',
      city: '도쿄',
      region: '간토',
      available: true,
      features: ['도심 근접', '빠른 배송', '심야 서비스'],
      terminals: ['제1터미널', '제2터미널', '국제선터미널'],
      pickupTime: '도착 후 30분 이내',
      deliveryAreas: ['도쿄 23구', '가와사키시', '요코하마시'],
      price: '₩40,000~',
      image: '🏙️',
      description: '도심 접근성이 뛰어난 공항'
    },
    {
      name: '주부 센트레아 국제공항',
      nameEn: 'Chubu Centrair International Airport',
      code: 'NGO',
      city: '나고야',
      region: '주부',
      available: false,
      features: ['서비스 예정', '2024년 하반기'],
      terminals: ['메인터미널'],
      pickupTime: '서비스 예정',
      deliveryAreas: ['나고야시', '기후현'],
      price: '₩30,000~',
      image: '🚧',
      description: '나고야 지역 서비스 준비 중'
    },
    {
      name: '후쿠오카 공항',
      nameEn: 'Fukuoka Airport',
      code: 'FUK',
      city: '후쿠오카',
      region: '규슈',
      available: false,
      features: ['서비스 예정', '2025년 상반기'],
      terminals: ['국내선터미널', '국제선터미널'],
      pickupTime: '서비스 예정',
      deliveryAreas: ['후쿠오카시', '기타큐슈시'],
      price: '₩35,000~',
      image: '🚧',
      description: '규슈 지역 서비스 확장 예정'
    },
    {
      name: '삿포로 신치토세 공항',
      nameEn: 'New Chitose Airport',
      code: 'CTS',
      city: '삿포로',
      region: '홋카이도',
      available: false,
      features: ['서비스 예정', '2025년'],
      terminals: ['국내선터미널', '국제선터미널'],
      pickupTime: '서비스 예정',
      deliveryAreas: ['삿포로시', '오타루시'],
      price: '₩40,000~',
      image: '🚧',
      description: '홋카이도 서비스 확장 예정'
    }
  ];

  const serviceInfo = [
    {
      title: '픽업 서비스',
      description: '공항 도착 후 지정된 장소에서 짐을 픽업합니다',
      details: [
        '도착 게이트 근처 픽업',
        '전문 기사 대기',
        'SMS 안내 서비스',
        '신분증 확인 후 수거'
      ],
      icon: '📥'
    },
    {
      title: '실시간 추적',
      description: '짐의 위치를 실시간으로 확인할 수 있습니다',
      details: [
        'GPS 기반 위치 추적',
        '배송 상태 업데이트',
        'SMS/앱 알림',
        '예상 도착 시간 안내'
      ],
      icon: '📍'
    },
    {
      title: '안전 보관',
      description: '배송 전까지 안전하게 보관됩니다',
      details: [
        '온도/습도 관리',
        '24시간 보안 시설',
        '보험 적용',
        '파손 방지 포장'
      ],
      icon: '🔒'
    }
  ];

  const availableAirports = airports.filter(airport => airport.available);
  const comingSoonAirports = airports.filter(airport => !airport.available);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">✈️</span>
              <span className="font-medium">지원 공항</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              전국 주요 공항에서<br />CarryDrop 서비스
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              도착하자마자 바로 관광을 시작하세요<br />
              무거운 짐은 저희가 배송해드립니다
            </p>
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              공항 배송 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* Available Airports */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              서비스 중인 공항
            </h2>
            <p className="text-lg text-gray-600">
              현재 CarryDrop 서비스를 이용할 수 있는 공항들입니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableAirports.map((airport, index) => (
              <div key={airport.code} className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{airport.image}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{airport.name}</h3>
                  <p className="text-gray-600 mb-2">{airport.nameEn}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      {airport.code}
                    </span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      운영중
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{airport.description}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">📍 배송 지역</h4>
                    <div className="flex flex-wrap gap-2">
                      {airport.deliveryAreas.map((area, areaIndex) => (
                        <span key={areaIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-2">⚡ 주요 특징</h4>
                    <ul className="space-y-1">
                      {airport.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-600">픽업 시간</span>
                      <p className="font-bold text-gray-800">{airport.pickupTime}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-600">시작 가격</span>
                      <p className="text-2xl font-bold text-purple-600">{airport.price}</p>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/${lng}/request-delivery`}
                  className="w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 transition-all text-center block"
                >
                  {airport.name}에서 배송 신청
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              공항 서비스 특징
            </h2>
            <p className="text-lg text-gray-600">
              공항에서만 경험할 수 있는 특별한 서비스
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceInfo.map((service, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-purple-500">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Airports */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              서비스 확장 예정
            </h2>
            <p className="text-lg text-gray-600">
              곧 추가될 공항들을 미리 확인해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonAirports.map((airport, index) => (
              <div key={airport.code} className="bg-gray-100 rounded-2xl p-8 shadow-sm border relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
                    Coming Soon
                  </span>
                </div>
                
                <div className="text-center mb-6 opacity-75">
                  <div className="text-6xl mb-4">{airport.image}</div>
                  <h3 className="text-2xl font-bold text-gray-600 mb-2">{airport.name}</h3>
                  <p className="text-gray-500 mb-2">{airport.nameEn}</p>
                  <div className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-bold inline-block mb-4">
                    {airport.code}
                  </div>
                  <p className="text-gray-500 text-sm">{airport.description}</p>
                </div>

                <div className="space-y-4 mb-6 opacity-75">
                  <div>
                    <h4 className="font-bold text-gray-600 mb-2">📍 예정 배송 지역</h4>
                    <div className="flex flex-wrap gap-2">
                      {airport.deliveryAreas.map((area, areaIndex) => (
                        <span key={areaIndex} className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">예상 가격</span>
                      <p className="text-xl font-bold text-gray-600">{airport.price}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-200 text-gray-600 font-bold py-3 px-6 rounded-lg text-center">
                  서비스 준비 중
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              공항 서비스 FAQ
            </h2>
            <p className="text-lg text-gray-600">
              공항 배송과 관련된 자주 묻는 질문들
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-purple-500">Q.</span>
                항공편이 지연되면 어떻게 하나요?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-6">
                <span className="text-blue-500 font-bold">A.</span> 실시간으로 항공편 정보를 확인하고 있어 자동으로 픽업 시간이 조정됩니다. 추가 요금은 발생하지 않습니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-purple-500">Q.</span>
                픽업 장소는 어디인가요?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-6">
                <span className="text-blue-500 font-bold">A.</span> 각 공항의 도착 게이트 근처 지정된 장소에서 만나게 됩니다. 예약 시 상세한 위치를 안내해드립니다.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-purple-500">Q.</span>
                공항에서 직접 대기해야 하나요?
              </h3>
              <p className="text-gray-600 leading-relaxed pl-6">
                <span className="text-blue-500 font-bold">A.</span> 아니요. 픽업 담당자가 도착 게이트에서 대기하고 있으며, 짐만 전달하시면 바로 관광을 시작하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 공항 배송을 신청하세요!
          </h2>
          <p className="text-xl mb-8 opacity-95">
            도착하자마자 자유로운 여행의 시작
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              배송 신청하기
            </Link>
            <Link 
              href={`/${lng}/usage-guide`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              이용 안내 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 