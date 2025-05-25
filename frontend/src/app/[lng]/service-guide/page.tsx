import Link from 'next/link';
import { useTranslation } from '../../../i18n';
import React from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function ServiceGuidePage({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'common');

  const serviceFeatures = [
    {
      icon: '🚚',
      title: '당일 배송',
      subtitle: 'Same-day Delivery',
      desc: '당일 오후 2시까지 신청하면 같은 날 배송 완료! 여행 일정에 맞춰 빠른 배송을 제공합니다.',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: '🛡️',
      title: '안전한 운송',
      subtitle: 'Safe & Secure',
      desc: '전문 운송팀과 보험 적용으로 귀중한 짐을 안전하게 배송합니다. 파손 시 100% 보상!',
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: '📱',
      title: '실시간 추적',
      subtitle: 'Real-time Tracking',
      desc: 'QR 코드와 앱을 통해 실시간으로 배송 현황을 확인할 수 있습니다.',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      icon: '💰',
      title: '합리적 가격',
      subtitle: 'Affordable Price',
      desc: '택시비보다 저렴한 가격으로 편리한 배송 서비스를 이용하세요.',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const pricingPlans = [
    {
      type: 'STANDARD',
      title: '스탠다드',
      subtitle: '일반 배송',
      price: '¥2,500',
      originalPrice: '¥3,000',
      features: [
        '공항 ↔ 호텔/Airbnb',
        '당일 배송 (4-6시간)',
        '기본 보험 적용',
        '실시간 추적',
        '캐리어 2개까지'
      ],
      popular: false,
      color: 'border-gray-200'
    },
    {
      type: 'EXPRESS',
      title: '익스프레스',
      subtitle: '빠른 배송',
      price: '¥3,800',
      originalPrice: '¥4,500',
      features: [
        '공항 ↔ 호텔/Airbnb',
        '당일 배송 (2-3시간)',
        '프리미엄 보험 적용',
        '실시간 추적',
        '캐리어 3개까지',
        '우선 처리'
      ],
      popular: true,
      color: 'border-red-500 bg-red-50'
    },
    {
      type: 'PREMIUM',
      title: '프리미엄',
      subtitle: '럭셔리 서비스',
      price: '¥5,500',
      originalPrice: '¥6,500',
      features: [
        '모든 지역 배송',
        '당일 배송 (1-2시간)',
        '완전 보험 적용',
        '실시간 추적',
        '제한 없는 짐',
        '픽업/배송 알림',
        '24시간 고객지원'
      ],
      popular: false,
      color: 'border-purple-200'
    }
  ];

  const deliveryAreas = [
    {
      city: '도쿄',
      areas: ['시부야', '신주쿠', '하라주쿠', '아키하바라', '긴자', '우에노', '아사쿠사'],
      airports: ['하네다 공항', '나리타 공항']
    },
    {
      city: '오사카',
      areas: ['도톤보리', '난바', '우메다', '신사이바시', '텐노지', '오사카성'],
      airports: ['간사이 공항', '이타미 공항']
    },
    {
      city: '교토',
      areas: ['기온', '아라시야마', '후시미', '키요미즈데라', '니조성', '킨카쿠지'],
      airports: ['간사이 공항']
    },
    {
      city: '요코하마',
      areas: ['미나토미라이', '차이나타운', '고스모월드', '랜드마크타워'],
      airports: ['하네다 공항', '나리타 공항']
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: '예약하기',
      desc: '앱에서 픽업 장소와 배송 장소를 입력하고 예약하세요.',
      icon: '📱',
      color: 'bg-blue-500'
    },
    {
      step: 2,
      title: '짐 맡기기',
      desc: '지정된 시간에 전문 픽업팀이 방문하여 짐을 수거합니다.',
      icon: '📦',
      color: 'bg-green-500'
    },
    {
      step: 3,
      title: '안전한 운송',
      desc: '전문 배송팀이 안전하게 목적지까지 운송합니다.',
      icon: '🚛',
      color: 'bg-orange-500'
    },
    {
      step: 4,
      title: '배송 완료',
      desc: '목적지에 도착하면 알림을 받고 짐을 수령하세요.',
      icon: '🎯',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-500 via-red-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">🧳</span>
              <span className="font-medium">캐리드롭 서비스 안내</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              일본 여행, 이제 짐 걱정 없이!
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              공항에서 숙소까지, 호텔에서 호텔까지<br />
              무거운 캐리어는 저희가 안전하게 배송해드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${lng}/request-delivery`}
                className="bg-white text-red-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
              >
                지금 배송 신청하기
              </Link>
              <Link 
                href="#pricing"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
              >
                요금 확인하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              왜 캐리드롭을 선택해야 할까요?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              30,000명 이상의 고객이 선택한 믿을 수 있는 짐 배송 서비스
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceFeatures.map((feature, index) => (
              <div key={index} className={`p-8 rounded-2xl border-2 ${feature.color} hover:shadow-lg transition-all transform hover:-translate-y-2`}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-500 mb-3 font-medium">{feature.subtitle}</p>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              이용 방법
            </h2>
            <p className="text-lg text-gray-600">
              간단한 4단계로 완료되는 짐 배송 서비스
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6`}>
                    {step.step}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="w-0 h-0 border-l-4 border-l-gray-300 border-y-2 border-y-transparent absolute -right-1 top-1/2 transform -translate-y-1/2"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              요금제
            </h2>
            <p className="text-lg text-gray-600">
              필요에 맞는 요금제를 선택하세요
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-2xl border-2 ${plan.color} ${plan.popular ? 'transform scale-105' : ''} transition-all hover:shadow-xl`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      인기 1위
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-4">{plan.subtitle}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-red-600">{plan.price}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{plan.originalPrice}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href={`/${lng}/request-delivery?plan=${plan.type.toLowerCase()}`}
                  className={`block w-full text-center py-4 px-6 rounded-lg font-bold transition-all ${
                    plan.popular 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  이 플랜 선택하기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              서비스 지역
            </h2>
            <p className="text-lg text-gray-600">
              일본 주요 도시와 관광지를 모두 커버합니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deliveryAreas.map((area, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{area.city}</h3>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-blue-500 mr-2">✈️</span>
                    공항
                  </h4>
                  <div className="space-y-2">
                    {area.airports.map((airport, airportIndex) => (
                      <div key={airportIndex} className="text-sm text-gray-600 bg-blue-50 px-3 py-2 rounded-lg">
                        {airport}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                    <span className="text-green-500 mr-2">🏨</span>
                    주요 지역
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {area.areas.map((location, locationIndex) => (
                      <div key={locationIndex} className="text-sm text-gray-600 bg-green-50 px-2 py-1 rounded text-center">
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              원하는 지역이 없나요? 언제든 문의해주세요!
            </p>
            <Link 
              href={`/${lng}/contact`}
              className="inline-block bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all"
            >
              서비스 지역 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 바로 시작하세요!
          </h2>
          <p className="text-xl mb-8 opacity-95">
            무거운 짐은 저희가, 즐거운 여행은 당신이!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-red-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              배송 신청하기
            </Link>
            <Link 
              href={`/${lng}/download-app`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              앱 다운로드
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 