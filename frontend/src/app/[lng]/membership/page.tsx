import React from 'react';
import { useTranslation } from '../../../i18n';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function MembershipPage({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'common');

  const membershipPlans = [
    {
      name: 'Basic',
      nameKr: '베이직',
      price: 0,
      period: '무료',
      color: 'gray',
      icon: '🎒',
      features: [
        '월 1회 무료 배송',
        '기본 고객 지원',
        '표준 배송 시간',
        '배송 상태 알림'
      ],
      limitations: [
        '추가 배송 시 정가 결제',
        '우선 고객지원 불가'
      ]
    },
    {
      name: 'Premium',
      nameKr: '프리미엄',
      price: 2980,
      period: '월',
      color: 'red',
      icon: '🌟',
      popular: true,
      features: [
        '월 5회 무료 배송',
        '24/7 우선 고객 지원',
        '익스프레스 배송 20% 할인',
        '실시간 GPS 추적',
        '픽업 시간 변경 무료',
        '캐리어 보험 자동 적용'
      ],
      savings: '매월 최대 ₩10,000,000 절약'
    },
    {
      name: 'VIP',
      nameKr: 'VIP',
      price: 4980,
      period: '월',
      color: 'yellow',
      icon: '👑',
      features: [
        '무제한 무료 배송',
        '전용 VIP 고객 지원',
        '프리미엄 배송 무료',
        '동일일 배송 서비스',
        '개인 배송 담당자',
        '캐리어 세탁 서비스',
        '공항 VIP 라운지 이용권',
        '파트너 호텔 특가 혜택'
      ],
      savings: '매월 최대 ₩18,750,000 절약'
    }
  ];

  const additionalBenefits = [
    {
      icon: '🎁',
      title: '신규 가입 혜택',
      description: '첫 달 50% 할인 + 무료 배송 2회 추가'
    },
    {
      icon: '🔄',
      title: '언제든 변경 가능',
      description: '플랜 업그레이드/다운그레이드 자유롭게'
    },
    {
      icon: '💰',
      title: '연간 결제 할인',
      description: '12개월 결제 시 2개월 무료'
    },
    {
      icon: '🛡️',
      title: '100% 만족 보장',
      description: '30일 무조건 환불 보장'
    }
  ];

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'red':
        return 'bg-red-500 hover:bg-red-600 text-white';
      case 'yellow':
        return 'bg-yellow-500 hover:bg-yellow-600 text-white';
      default:
        return 'bg-gray-500 hover:bg-gray-600 text-white';
    }
  };

  const getCardBorder = (color: string, popular?: boolean) => {
    if (popular) return 'border-red-500 border-2 relative';
    switch (color) {
      case 'red':
        return 'border-red-200 border';
      case 'yellow':
        return 'border-yellow-200 border';
      default:
        return 'border-gray-200 border';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            CarryDrop 멤버십
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            더 많은 혜택과 편리함을 경험하세요
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">50,000+</div>
              <div className="text-sm opacity-75">멤버십 회원</div>
            </div>
            <div>
              <div className="text-3xl font-bold">₩225,000만</div>
              <div className="text-sm opacity-75">연간 절약 금액</div>
            </div>
            <div>
              <div className="text-3xl font-bold">99.8%</div>
              <div className="text-sm opacity-75">고객 만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              당신에게 맞는 플랜을 선택하세요
            </h2>
            <p className="text-xl text-gray-600">
              모든 플랜에는 기본 배송 보험과 안전 보장이 포함됩니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-lg p-8 ${getCardBorder(plan.color, plan.popular)} transform hover:scale-105 transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      가장 인기
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="text-4xl mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.nameKr}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-800">
                      ₩{plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600 ml-2">/ {plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations?.map((limitation, idx) => (
                    <div key={idx} className="flex items-center">
                      <span className="text-red-400 mr-3">✗</span>
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all ${getButtonColor(plan.color)}`}
                >
                  {plan.price === 0 ? '무료로 시작하기' : '지금 구독하기'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              모든 멤버십의 추가 혜택
            </h2>
            <p className="text-xl text-gray-600">
              CarryDrop 멤버십만의 특별한 혜택들
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              자주 묻는 질문
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                q: '멤버십은 언제든지 해지할 수 있나요?',
                a: '네, 언제든지 해지 가능합니다. 해지 후에도 현재 결제 기간 종료까지는 모든 혜택을 이용하실 수 있습니다.'
              },
              {
                q: '무료 배송 횟수가 남으면 다음 달로 이월되나요?',
                a: '미사용 무료 배송 횟수는 다음 달로 최대 2회까지 이월 가능합니다.'
              },
              {
                q: '멤버십 혜택은 언제부터 적용되나요?',
                a: '결제 완료 즉시 모든 혜택이 적용되며, 24시간 이내에 멤버십 카드가 이메일로 발송됩니다.'
              },
              {
                q: '가족이나 친구와 멤버십을 공유할 수 있나요?',
                a: 'VIP 멤버십의 경우 최대 2명의 가족 구성원과 혜택을 공유하실 수 있습니다.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Q. {faq.q}
                </h3>
                <p className="text-gray-600">
                  A. {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            지금 시작하고 첫 달 50% 할인 받으세요!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            CarryDrop 멤버십으로 더 편리하고 경제적인 여행을 경험하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-500 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              무료로 시작하기
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-red-500 transition-colors">
              플랜 비교하기
            </button>
          </div>
        </div>
      </section>
    </div>
  );
} 