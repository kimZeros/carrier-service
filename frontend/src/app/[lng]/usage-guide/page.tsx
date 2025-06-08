'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function UsageGuidePage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const steps = [
    {
      number: 1,
      title: '배송 신청',
      description: '온라인으로 간편하게 배송을 신청하세요',
      details: [
        '출발지와 도착지 정보 입력',
        '짐 정보 및 특별 요청사항 기입',
        '원하는 배송 시간 선택',
        '실시간 요금 확인'
      ],
      icon: '📝',
      time: '3분'
    },
    {
      number: 2,
      title: '짐 수거',
      description: '지정된 시간에 전문 기사가 방문합니다',
      details: [
        '예약 시간 30분 전 SMS 알림',
        '신분증을 통한 본인 확인',
        '짐 상태 점검 및 사진 촬영',
        '수거 완료 알림 발송'
      ],
      icon: '🚚',
      time: '10분'
    },
    {
      number: 3,
      title: '안전 운송',
      description: 'GPS 추적을 통해 실시간으로 확인하세요',
      details: [
        '실시간 위치 추적 서비스',
        '온도/습도 관리 운송',
        '충격 방지 포장 서비스',
        '운송 상태 실시간 업데이트'
      ],
      icon: '📦',
      time: '2-6시간'
    },
    {
      number: 4,
      title: '배송 완료',
      description: '목적지에서 안전하게 짐을 받으세요',
      details: [
        '도착 30분 전 SMS 알림',
        '수령인 신분 확인',
        '짐 상태 최종 점검',
        '배송 완료 확인 및 평가'
      ],
      icon: '✅',
      time: '5분'
    }
  ];

  const serviceTypes = [
    {
      type: '공항 → 숙소',
      description: '공항 도착 후 바로 관광을 시작하세요',
      features: ['당일 배송', '24시간 접수', '영어/한국어 지원'],
      price: '₩35,000~',
      popular: true
    },
    {
      type: '숙소 → 숙소',
      description: '도시 간 이동시 편리한 짐 배송',
      features: ['전국 배송', '당일/익일 선택', '료칸 배송 가능'],
      price: '₩25,000~',
      popular: false
    },
    {
      type: '숙소 → 공항',
      description: '마지막 날까지 자유롭게 여행하세요',
      features: ['출발 당일 오전 픽업', '공항 대기', '체크인 지원'],
      price: '₩45,000~',
      popular: false
    }
  ];

  const tips = [
    {
      title: '예약 시간',
      content: '배송 희망일 최소 3시간 전까지 예약하세요. 당일 예약도 가능하지만 추가 요금이 발생할 수 있습니다.',
      icon: '⏰'
    },
    {
      title: '짐 포장',
      content: '귀중품은 별도 포장하고, 깨지기 쉬운 물건은 미리 알려주세요. 전문 포장재를 무료로 제공합니다.',
      icon: '📦'
    },
    {
      title: '요금 절약',
      content: '멤버십 가입시 최대 30% 할인! 여러 개의 짐을 함께 보내면 추가 할인 혜택이 있습니다.',
      icon: '💰'
    },
    {
      title: '날씨 대비',
      content: '우천시에도 방수 포장으로 안전하게 배송합니다. 태풍 등 악천후시에는 일정 조정이 가능합니다.',
      icon: '🌧️'
    }
  ];

  const faqs = [
    {
      question: '배송이 지연되면 어떻게 하나요?',
      answer: '교통 상황으로 인한 지연시 실시간으로 알려드리며, 30분 이상 지연시 배송비를 할인해드립니다.'
    },
    {
      question: '짐이 분실되거나 파손되면?',
      answer: '모든 짐에 대해 최대 100만원까지 보상보험이 적용됩니다. 분실/파손시 즉시 고객센터로 연락주세요.'
    },
    {
      question: '취소나 변경이 가능한가요?',
      answer: '픽업 2시간 전까지는 무료 취소/변경이 가능합니다. 그 이후에는 취소 수수료가 발생할 수 있습니다.'
    },
    {
      question: '대형 짐도 배송 가능한가요?',
      answer: '골프백, 스키장비, 서핑보드 등 대형 짐도 배송 가능합니다. 사전에 크기와 무게를 알려주세요.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">📋</span>
              <span className="font-medium">CarryDrop 이용 안내</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              쉽고 안전한<br />배송 서비스 이용법
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              처음 이용하시나요? 간단한 4단계로<br />
              CarryDrop 서비스를 이용해보세요
            </p>
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              지금 배송 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* Service Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              이용 과정
            </h2>
            <p className="text-lg text-gray-600">
              간단한 4단계로 완성되는 안전한 배송 서비스
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 transform translate-x-4 z-0"></div>
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all relative z-10">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                      {step.icon}
                    </div>
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      STEP {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      약 {step.time}
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-purple-500 mt-1">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              서비스 유형
            </h2>
            <p className="text-lg text-gray-600">
              여행 일정에 맞는 다양한 배송 옵션
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {serviceTypes.map((service, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all relative ${service.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      인기
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.type}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="text-3xl font-bold text-purple-600">{service.price}</div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-gray-600">
                      <span className="text-green-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/${lng}/request-delivery`}
                  className={`w-full text-center py-3 px-6 rounded-lg font-bold transition-all block ${
                    service.popular 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'border border-purple-500 text-purple-500 hover:bg-purple-50'
                  }`}
                >
                  신청하기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              이용 팁
            </h2>
            <p className="text-lg text-gray-600">
              더 똑똑하게 CarryDrop을 이용하는 방법
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.content}</p>
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
              자주 묻는 질문
            </h2>
            <p className="text-lg text-gray-600">
              궁금한 점이 있으시면 확인해보세요
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-purple-500">Q.</span>
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed pl-6">
                  <span className="text-blue-500 font-bold">A.</span> {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            이제 CarryDrop과 함께 떠나세요!
          </h2>
          <p className="text-xl mb-8 opacity-95">
            무거운 짐은 저희가, 즐거운 여행은 여러분이
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              배송 신청하기
            </Link>
            <Link 
              href={`/${lng}/service-guide`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              서비스 자세히 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 