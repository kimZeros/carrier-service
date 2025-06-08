import Link from 'next/link';
import { useTranslation } from '../../i18n';
import React from 'react';
import FAQSection from '../components/FAQSection';
import ReviewsCarousel from '../components/ReviewsCarousel';
import HeroBackground from '../components/HeroBackground';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'common');

  const benefits = [
    {
      icon: '🧳',
      title: t('benefit_freedom_title'),
      desc: t('benefit_freedom_desc')
    },
    {
      icon: '🛡️',
      title: t('benefit_safe_delivery_title'),
      desc: t('benefit_safe_delivery_desc')
    },
    {
      icon: '🏠',
      title: t('benefit_flexible_accommodations_title'),
      desc: t('benefit_flexible_accommodations_desc')
    },
    {
      icon: '⚡',
      title: t('benefit_time_saving_title'),
      desc: t('benefit_time_saving_desc')
    },
    {
      icon: '🚇',
      title: t('benefit_convenient_travel_title'),
      desc: t('benefit_convenient_travel_desc')
    },
    {
      icon: '🗾',
      title: t('benefit_wide_coverage_title'),
      desc: t('benefit_wide_coverage_desc')
    }
  ];

  const deliveryOptions = [
    {
      icon: '✈️🏨',
      title: t('delivery_airport_to_hotel'),
      desc: '공항에서 호텔까지 직접 배송'
    },
    {
      icon: '✈️🏠',
      title: t('delivery_airport_to_airbnb'),
      desc: '공항에서 에어비앤비까지 직접 배송'
    },
    {
      icon: '🏨🏠',
      title: t('delivery_hotel_to_airbnb'),
      desc: '호텔에서 에어비앤비로 이동 시 배송'
    },
    {
      icon: '🏨🏨',
      title: t('delivery_hotel_to_hotel'),
      desc: '호텔 간 이동 시 캐리어 배송'
    },
    {
      icon: '🏠🏨',
      title: t('delivery_airbnb_to_hotel'),
      desc: '에어비앤비에서 호텔로 이동 시 배송'
    },
    {
      icon: '🏠🏠',
      title: t('delivery_airbnb_to_airbnb'),
      desc: '에어비앤비 간 이동 시 배송'
    }
  ];

  const steps = [
    {
      number: 1,
      icon: '📱',
      title: t('step1_title'),
      desc: t('step1_desc')
    },
    {
      number: 2,
      icon: '📦',
      title: t('step2_title'),
      desc: t('step2_desc')
    },
    {
      number: 3,
      icon: '🚛',
      title: t('step3_title'),
      desc: t('step3_desc')
    },
    {
      number: 4,
      icon: '🎯',
      title: t('step4_title'),
      desc: t('step4_desc')
    }
  ];

  const reviews = [
    {
      name: t('customer_name'),
      location: t('customer_location'),
      review: t('customer_review'),
      rating: 5
    },
    {
      name: '田中さん',
      location: '東京, 日本',
      review: 'ホテルからAirbnbへの移動で利用しました。重いスーツケースを持って電車で移動する必要がなく、とても楽でした。サービスの質も高く、また利用したいです。',
      rating: 5
    },
    {
      name: 'Smith Johnson',
      location: 'New York, USA',
      review: 'Amazing service! Used it from airport to my Airbnb in Shibuya. The luggage was already there when I arrived. Perfect for travelers who want to explore Tokyo hands-free!',
      rating: 5
    }
  ];

  return (
    <>
      {/* Statistics Banner */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">30k+</div>
              <div className="text-sm md:text-base opacity-90">{t('stats_satisfied_customers')}</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">7</div>
              <div className="text-sm md:text-base opacity-90">{t('stats_airports')}</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
              <div className="text-sm md:text-base opacity-90">{t('stats_partner_accommodations')}</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
              <div className="text-sm md:text-base opacity-90">{t('stats_safe_delivery')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section with Background Slideshow */}
      <section className="relative text-white flex items-center justify-start h-screen overflow-hidden">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        
        <div className="relative z-20 container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('hero_title')}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed opacity-95">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${lng}/request-delivery`} 
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-xl text-center group"
              >
                <span className="group-hover:mr-2 transition-all">{t('hero_button_request_delivery')}</span>
                <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link 
                href={`/${lng}/service-guide`} 
                className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 border border-white/30 text-center"
              >
                {t('hero_button_learn_more')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Options Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
              🚚 배송 서비스
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            {t('delivery_options_title')}
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto text-lg">
            어디에서 어디로든 - 호텔, 에어비앤비, 공항 간 자유로운 배송 서비스를 제공합니다.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliveryOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:border-red-200 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800">{option.title}</h3>
                <p className="text-gray-600 text-sm">{option.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CarryDrop Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
              ✓ 왜 캐리드롭인가요?
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            {t('why_carrydrop')}
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
            {t('why_carrydrop_subtitle')}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group hover:-translate-y-2"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="text-4xl mb-6 text-red-500 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link 
              href={`/${lng}/service-guide`}
              className="inline-block border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('learn_more_about_service')} →
            </Link>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
              ✓ 간단한 4단계 프로세스
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            {t('how_to_use_title')}
          </h2>
          <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto text-lg">
            {t('how_to_use_subtitle')}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent -translate-x-10"></div>
                  )}
                </div>
                <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-2xl">
            <p className="text-lg mb-6 text-gray-700">{t('reservation_cta')}</p>
            <Link 
              href={`/${lng}/request-delivery`}
              className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('book_now')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <ReviewsCarousel 
        reviews={reviews} 
        lng={lng} 
        translations={{
          title: t('customer_reviews_title'),
          subtitle: t('customer_reviews_subtitle')
        }}
      />

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">4.8/5</div>
              <div className="text-gray-600 font-medium">{t('stats_rating')}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">98%</div>
              <div className="text-gray-600 font-medium">{t('stats_recommendation')}</div>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl font-bold text-red-500 mb-2">30K+</div>
              <div className="text-gray-600 font-medium">{t('stats_customers')}</div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href={`/${lng}/reviews`}
              className="inline-block border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {t('view_all_reviews')} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection 
        lng={lng} 
        translations={{
          title: t('faq_title'),
          subtitle: t('faq_subtitle'),
          q1: t('faq_q1'),
          q2: t('faq_q2'),
          q3: t('faq_q3')
        }}
      />

      {/* More Questions Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              {t('more_questions_title')}
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              {t('more_questions_subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${lng}/contact`}
                className="inline-flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">📧</span>
                {t('contact_email')}
              </Link>
              <Link 
                href={`/${lng}/support`}
                className="inline-flex items-center justify-center border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">📞</span>
                {t('contact_center')}
              </Link>
            </div>
          </div>
          
          <div className="text-8xl text-red-200 mt-8 animate-bounce">❓</div>
        </div>
      </section>

      {/* Accommodation Guide Section */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-indigo-100 to-pink-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🏨 숙소 안내
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              일본 여행의 완벽한 숙소 찾기
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              CarryDrop 제휴 숙소에서 더욱 편리한 짐 배송 서비스를 경험하세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center transform hover:-translate-y-2">
              <div className="text-5xl mb-6">🏨</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">호텔 & 료칸</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">프론트 데스크에서 짐 픽업/수령이 가능한 프리미엄 숙소들</p>
              <div className="text-purple-600 font-bold">₩25,000 - ₩125,000</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center transform hover:-translate-y-2">
              <div className="text-5xl mb-6">🏠</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">에어비앤비</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">현지인처럼 머물며 호스트와 협의하여 짐 배송 시간 조율</p>
              <div className="text-purple-600 font-bold">₩35,000 - ₩85,000</div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center transform hover:-translate-y-2">
              <div className="text-5xl mb-6">🛏️</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">게스트하우스</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">공용 짐 보관소에서 픽업/배송 가능한 경제적인 숙소</p>
              <div className="text-purple-600 font-bold">₩30,000 - ₩65,000</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">🏙️ 도쿄 추천 숙소</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl">🏨</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">시부야 스카이 호텔</h4>
                    <p className="text-sm text-gray-600">시부야역 도보 3분 • CarryDrop 제휴</p>
                  </div>
                  <div className="text-purple-600 font-bold">₩25,000</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl">⛩️</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">아사쿠사 전통 료칸</h4>
                    <p className="text-sm text-gray-600">센소지 도보 5분 • VIP 짐 서비스</p>
                  </div>
                  <div className="text-purple-600 font-bold">₩45,000</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">🏯 오사카 & 교토</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl">🌊</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">도톤보리 리버사이드</h4>
                    <p className="text-sm text-gray-600">도톤보리 중심가 • 강변 뷰</p>
                  </div>
                  <div className="text-purple-600 font-bold">₩35,000</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl">🎋</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">기온 헤리티지 인</h4>
                    <p className="text-sm text-gray-600">기온 게이샤 구역 • 전통 문화 체험</p>
                  </div>
                  <div className="text-purple-600 font-bold">₩55,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href={`/${lng}/accommodation-guide`}
              className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🏨 전체 숙소 가이드 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Membership & Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Membership Section */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                👑 멤버십
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                CarryDrop 멤버십으로<br />
                더 많은 혜택을 누리세요
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                베이직, 프리미엄, VIP 플랜으로 구성된 멤버십을 통해 
                무료 배송, 우선 고객지원, 특별 혜택을 경험하세요.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">🎒</div>
                  <div className="font-bold text-gray-800">베이직</div>
                  <div className="text-sm text-gray-600">월 1회 무료</div>
                </div>
                <div className="bg-red-50 p-4 rounded-xl text-center border-2 border-red-200">
                  <div className="text-2xl mb-2">🌟</div>
                  <div className="font-bold text-red-600">프리미엄</div>
                  <div className="text-sm text-gray-600">월 5회 무료</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl text-center">
                  <div className="text-2xl mb-2">👑</div>
                  <div className="font-bold text-yellow-600">VIP</div>
                  <div className="text-sm text-gray-600">무제한 무료</div>
                </div>
              </div>

              <Link 
                href={`/${lng}/membership`}
                className="inline-block bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                멤버십 플랜 보기 →
              </Link>
            </div>

            {/* Reviews Section */}
            <div className="text-center lg:text-left">
              <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ⭐ 고객 후기
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                15,000+ 고객들의<br />
                생생한 이용후기
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                실제 이용고객들이 남긴 솔직한 후기와 경험담을 확인하고, 
                여러분도 안심하고 서비스를 이용해보세요.
              </p>
              
              <div className="bg-green-50 p-6 rounded-xl mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex text-yellow-400 text-xl">
                    ★★★★★
                  </div>
                  <span className="ml-2 text-2xl font-bold text-gray-800">4.8</span>
                  <span className="ml-1 text-gray-600">/5</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-800">15,847</div>
                    <div className="text-sm text-gray-600">총 후기</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">98%</div>
                    <div className="text-sm text-gray-600">재이용 의사</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">77%</div>
                    <div className="text-sm text-gray-600">5점 만점</div>
                  </div>
                </div>
              </div>

              <Link 
                href={`/${lng}/reviews`}
                className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                전체 후기 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('cta_title')}
              </h2>
              <p className="text-lg mb-8 opacity-95">
                {t('cta_subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  href={`/${lng}/request-delivery`}
                  className="inline-block bg-white text-red-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {t('cta_book')} →
                </Link>
                <div className="border-2 border-white/30 py-4 px-8 rounded-lg backdrop-blur-sm">
                  이용 요금 안내
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm opacity-90">
                <div className="flex items-center space-x-2">
                  <span>✈️</span>
                  <span className="font-medium">7개 공항</span>
                  <span>일본 전역 대응</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>🛡️</span>
                  <span className="font-medium">안전 배송</span>
                  <span>보험 기본 적용</span>
                </div>
                <Link 
                  href={`/${lng}/accommodation-guide`}
                  className="flex items-center space-x-2 hover:text-white/80 transition-colors"
                >
                  <span>🏠</span>
                  <span className="font-medium">1,200+ 숙소</span>
                  <span>호텔&에어비앤비</span>
                </Link>
              </div>
            </div>
            
            <div className="lg:w-1/3 text-center">
              <div className="bg-white/10 backdrop-blur-sm text-white p-6 rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">{t('cta_route_example')}</h3>
                <p className="text-white/80 mb-4">{t('cta_route_desc')}</p>
                <div className="text-3xl font-bold">{t('cta_price')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 