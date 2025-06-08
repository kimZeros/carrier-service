'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function PartnershipPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [activeTab, setActiveTab] = useState('accommodation');

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const partnershipTypes = [
    {
      id: 'accommodation',
      title: '숙소 제휴',
      icon: '🏨',
      description: '호텔, 료칸, 게스트하우스 등 숙박업소 제휴',
      color: 'purple'
    },
    {
      id: 'delivery',
      title: '배송 파트너',
      icon: '🚚',
      description: '전문 배송업체 및 개인 배송 기사 모집',
      color: 'blue'
    },
    {
      id: 'corporate',
      title: '기업 제휴',
      icon: '🏢',
      description: '여행사, 항공사, 기업 복지 서비스 제휴',
      color: 'green'
    },
    {
      id: 'technology',
      title: '기술 제휴',
      icon: '⚙️',
      description: 'IT 서비스, 앱 개발, 시스템 통합 제휴',
      color: 'orange'
    }
  ];

  const accommodationBenefits = [
    {
      title: '추가 수익 창출',
      description: '배송 서비스 수수료로 월 평균 100만원 이상 추가 수익',
      details: ['배송 건당 수수료', '월간 고정 수수료', '성과 보너스', '프리미엄 서비스 수수료'],
      icon: '💰'
    },
    {
      title: '고객 만족도 향상',
      description: '편리한 서비스로 고객 재방문율 30% 증가',
      details: ['고객 편의성 증대', '차별화된 서비스', '긍정적 리뷰 증가', '브랜드 이미지 향상'],
      icon: '👥'
    },
    {
      title: '운영 효율성',
      description: '전담 매니저와 시스템으로 운영 부담 최소화',
      details: ['전담 매니저 배정', '24시간 기술 지원', '자동화 시스템', '교육 및 훈련 지원'],
      icon: '⚡'
    },
    {
      title: '마케팅 지원',
      description: 'CarryDrop 마케팅 채널을 통한 홍보 효과',
      details: ['온라인 마케팅', 'SNS 홍보', '제휴 혜택 안내', '고객 유치 지원'],
      icon: '📢'
    }
  ];

  const requirements = [
    {
      type: '숙소 제휴',
      conditions: [
        '합법적인 숙박업 등록증 보유',
        '최소 10실 이상 규모',
        '체크인/아웃 데스크 운영',
        '안전한 보관 공간 확보',
        '한국어/영어 소통 가능 직원'
      ],
      process: [
        '온라인 신청서 제출',
        '서류 검토 (3-5일)',
        '현장 실사 (1주일)',
        '계약서 체결',
        '시스템 설치 및 교육',
        '서비스 시작'
      ]
    },
    {
      type: '배송 파트너',
      conditions: [
        '사업자등록증 및 운송업 허가',
        '배송 차량 보유 (소형 이상)',
        '배송 보험 가입',
        '스마트폰 사용 가능',
        '성실하고 친절한 서비스 마인드'
      ],
      process: [
        '파트너 신청서 제출',
        '자격 요건 검토',
        '면접 및 차량 점검',
        '계약 체결',
        '앱 설치 및 교육',
        '시범 운행 후 정식 시작'
      ]
    },
    {
      type: '기업 제휴',
      conditions: [
        '관련 업종 사업자등록증',
        '최소 3년 이상 운영 실적',
        '안정적인 재무 상태',
        '고객 서비스 인프라',
        '상호 발전 의지'
      ],
      process: [
        '제휴 제안서 제출',
        '사업 계획 검토',
        '상호 협의 및 조건 협상',
        '제휴 계약 체결',
        '시스템 연동',
        '공동 마케팅 시작'
      ]
    }
  ];

  const successStories = [
    {
      name: '오사카 센트럴 호텔',
      type: '숙소 제휴',
      period: '제휴 1년차',
      results: [
        '월 평균 150만원 추가 수익',
        '고객 만족도 4.8/5 달성',
        '재방문 고객 40% 증가',
        '온라인 리뷰 평점 상승'
      ],
      quote: "CarryDrop 제휴 후 고객들이 정말 만족해합니다. 추가 수익도 좋지만 고객 서비스 품질이 한층 높아진 게 가장 큰 성과입니다.",
      manager: '김영수 매니저'
    },
    {
      name: '도쿄 익스프레스 로지스틱스',
      type: '배송 파트너',
      period: '제휴 8개월',
      results: [
        '월 평균 배송 건수 300건',
        '평균 배송비 35,000원',
        '고객 평점 4.9/5 유지',
        '배송 기사 5명 추가 고용'
      ],
      quote: "안정적인 물량과 합리적인 수수료 덕분에 사업이 크게 성장했습니다. CarryDrop과 함께 더 큰 목표를 향해 나아가고 있습니다.",
      manager: '사토 다케시 대표'
    }
  ];

  const getTabContent = () => {
    const currentType = partnershipTypes.find(type => type.id === activeTab);
    const currentRequirement = requirements.find(req => 
      req.type === (activeTab === 'accommodation' ? '숙소 제휴' : 
                   activeTab === 'delivery' ? '배송 파트너' : '기업 제휴')
    );

    if (!currentType || !currentRequirement) return null;

    return (
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">제휴 조건</h3>
          <ul className="space-y-4">
            {currentRequirement.conditions.map((condition, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-600">{condition}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">진행 과정</h3>
          <div className="space-y-4">
            {currentRequirement.process.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <span className="text-gray-600">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">🤝</span>
              <span className="font-medium">CarryDrop 파트너십</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              함께 성장하는<br />신뢰의 파트너가 되세요
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              CarryDrop과 함께 새로운 비즈니스 기회를 만들어가고<br />
              상호 발전하는 파트너십을 구축해보세요
            </p>
            <Link 
              href="#partnership-form"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              파트너십 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              다양한 파트너십 기회
            </h2>
            <p className="text-lg text-gray-600">
              여러분의 비즈니스에 맞는 최적의 파트너십을 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipTypes.map((type) => (
              <div key={type.id} className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all cursor-pointer">
                <div className={`w-16 h-16 bg-${type.color}-100 text-${type.color}-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto`}>
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{type.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Accommodations */}
      {activeTab === 'accommodation' && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                숙소 제휴 혜택
              </h2>
              <p className="text-lg text-gray-600">
                CarryDrop과 제휴하여 얻을 수 있는 다양한 혜택들
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {accommodationBenefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                      <p className="text-gray-600 mb-4">{benefit.description}</p>
                      <ul className="space-y-2">
                        {benefit.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-purple-500">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Partnership Requirements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              제휴 조건 및 과정
            </h2>
            <p className="text-lg text-gray-600">
              원하는 파트너십 유형을 선택해서 자세한 정보를 확인하세요
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {partnershipTypes.slice(0, 3).map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === type.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                }`}
              >
                <span>{type.icon}</span>
                <span>{type.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {getTabContent()}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              파트너 성공 사례
            </h2>
            <p className="text-lg text-gray-600">
              실제 파트너들의 성공 스토리를 확인해보세요
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{story.name}</h3>
                      <div className="flex items-center gap-3">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {story.type}
                        </span>
                        <span className="text-gray-500 text-sm">{story.period}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {story.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-gray-600 text-sm">{result}</span>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-600 mb-4">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="text-right">
                    <span className="text-sm text-gray-500">- {story.manager}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Application Form */}
      <section id="partnership-form" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                파트너십 신청하기
              </h2>
              <p className="text-lg text-gray-600">
                아래 정보를 입력하시면 담당자가 빠르게 연락드리겠습니다
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">빠른 상담 신청</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">파트너십 유형</label>
                      <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                        <option value="">선택해주세요</option>
                        <option value="accommodation">숙소 제휴</option>
                        <option value="delivery">배송 파트너</option>
                        <option value="corporate">기업 제휴</option>
                        <option value="technology">기술 제휴</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">회사명/숙소명</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">담당자명</label>
                      <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                      <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6">상담 문의</h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                        📞
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">전화 상담</h4>
                      <p className="text-2xl font-bold text-purple-600 mb-2">1588-1234</p>
                      <p className="text-sm text-gray-600">평일 09:00~18:00</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                        ✉️
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">이메일 문의</h4>
                      <p className="text-lg font-bold text-purple-600 mb-2">partner@carrydrop.co.kr</p>
                      <p className="text-sm text-gray-600">24시간 접수</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button className="bg-purple-500 text-white font-bold py-4 px-12 rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105">
                  상담 신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              파트너십 FAQ
            </h2>
            <p className="text-lg text-gray-600">
              파트너십에 대한 자주 묻는 질문들
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: '제휴 계약 기간은 어떻게 되나요?',
                answer: '기본 계약 기간은 1년이며, 상호 협의하에 연장 가능합니다. 계약 만료 3개월 전에 재계약 협의를 진행합니다.'
              },
              {
                question: '수수료는 어떻게 정산되나요?',
                answer: '매월 말 정산하여 다음 달 10일에 지급됩니다. 상세한 정산 내역은 파트너 전용 시스템에서 실시간으로 확인 가능합니다.'
              },
              {
                question: '기술적 지원은 어떻게 받을 수 있나요?',
                answer: '전담 매니저 배정과 24시간 기술 지원 센터를 운영합니다. 시스템 문제 발생시 즉시 대응해드립니다.'
              },
              {
                question: '계약 해지 시 조건이 있나요?',
                answer: '3개월 전 사전 통보로 해지 가능합니다. 단, 진행 중인 배송 건은 완료 후 정산합니다.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
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
            지금 바로 파트너가 되어<br />새로운 기회를 잡으세요
          </h2>
          <p className="text-xl mb-8 opacity-95">
            CarryDrop과 함께 성장하는 비즈니스 파트너십을 시작해보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#partnership-form"
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              지금 신청하기
            </Link>
            <Link 
              href={`/${lng}/contact`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              상담 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 