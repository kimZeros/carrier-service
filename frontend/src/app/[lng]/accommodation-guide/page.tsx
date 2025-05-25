import Link from 'next/link';
import { useTranslation } from '../../../i18n';
import React from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function AccommodationGuidePage({ params }: PageProps) {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'common');

  const cities = [
    {
      name: '도쿄',
      nameEn: 'Tokyo',
      image: '🏙️',
      description: '현대와 전통이 공존하는 일본의 수도',
      districts: ['시부야', '신주쿠', '하라주쿠', '긴자', '아사쿠사', '우에노']
    },
    {
      name: '오사카',
      nameEn: 'Osaka',
      image: '🏯',
      description: '맛의 도시, 간사이 지역의 중심',
      districts: ['도톤보리', '난바', '우메다', '신사이바시', '덴노지']
    },
    {
      name: '교토',
      nameEn: 'Kyoto',
      image: '⛩️',
      description: '천년 고도, 일본 전통 문화의 보고',
      districts: ['기온', '아라시야마', '후시미', '키요미즈데라 주변']
    },
    {
      name: '요코하마',
      nameEn: 'Yokohama',
      image: '🌉',
      description: '항구 도시의 낭만과 현대적 매력',
      districts: ['미나토미라이', '차이나타운', '고스모월드 주변']
    }
  ];

  const accommodationTypes = [
    {
      type: 'HOTEL',
      title: '호텔',
      titleEn: 'Hotel',
      icon: '🏨',
      price: '¥8,000 - ¥25,000',
      features: ['24시간 프론트 데스크', '룸서비스', '컨시어지 서비스', 'CarryDrop 픽업/배송 지원'],
      bestFor: '편안한 숙박을 원하는 여행객',
      carryDropBenefit: '프론트 데스크에서 짐 픽업/수령 가능',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      type: 'RYOKAN',
      title: '료칸',
      titleEn: 'Ryokan',
      icon: '🏘️',
      price: '¥15,000 - ¥50,000',
      features: ['전통 일본식 숙박', '온천', '가이세키 요리', '타타미방', '개별 짐 보관 서비스'],
      bestFor: '일본 전통 문화를 체험하고 싶은 여행객',
      carryDropBenefit: '전용 짐 보관소에서 안전한 픽업/배송',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      type: 'AIRBNB',
      title: '에어비앤비',
      titleEn: 'Airbnb',
      icon: '🏠',
      price: '¥3,000 - ¥15,000',
      features: ['현지인처럼 머무르기', '주방 시설', '세탁기', '넓은 공간', '자율 체크인'],
      bestFor: '장기 체류나 가족 여행객',
      carryDropBenefit: '호스트와 협의하여 짐 배송 시간 조율',
      color: 'bg-green-50 border-green-200'
    },
    {
      type: 'HOSTEL',
      title: '게스트하우스',
      titleEn: 'Hostel',
      icon: '🛏️',
      price: '¥2,500 - ¥6,000',
      features: ['저렴한 가격', '공용 공간', '세계 각국 여행객들과 교류', '짐 보관 서비스'],
      bestFor: '백패커나 예산 여행객',
      carryDropBenefit: '공용 짐 보관소에서 픽업/배송',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const recommendedHotels = [
    {
      city: '도쿄',
      name: '시부야 스카이 호텔',
      nameEn: 'Shibuya Sky Hotel',
      type: '비즈니스 호텔',
      rating: 4.5,
      price: '¥12,000',
      location: '시부야역 도보 3분',
      features: ['무료 WiFi', '24시간 프론트', 'CarryDrop 제휴'],
      image: '🏙️',
      carryDropPartner: true
    },
    {
      city: '도쿄',
      name: '아사쿠사 전통 료칸',
      nameEn: 'Asakusa Traditional Ryokan',
      type: '료칸',
      rating: 4.8,
      price: '¥28,000',
      location: '센소지 도보 5분',
      features: ['온천', '전통 정원', '가이세키 요리', 'VIP 짐 서비스'],
      image: '⛩️',
      carryDropPartner: true
    },
    {
      city: '오사카',
      name: '도톤보리 리버사이드',
      nameEn: 'Dotonbori Riverside Hotel',
      type: '시티 호텔',
      rating: 4.6,
      price: '¥15,000',
      location: '도톤보리 중심가',
      features: ['강변 뷰', '레스토랑', 'CarryDrop 픽업 포인트'],
      image: '🌊',
      carryDropPartner: true
    },
    {
      city: '교토',
      name: '기온 헤리티지 인',
      nameEn: 'Gion Heritage Inn',
      type: '전통 여관',
      rating: 4.9,
      price: '¥35,000',
      location: '기온 게이샤 구역',
      features: ['역사적 건물', '정원', '전통 문화 체험', '개인 짐 관리'],
      image: '🎋',
      carryDropPartner: true
    }
  ];

  const carryDropServices = [
    {
      service: '호텔 직배송',
      icon: '🏨',
      description: '공항에서 호텔 프론트 데스크로 직접 배송',
      time: '당일 배송',
      benefit: '체크인 전에도 짐 보관 가능'
    },
    {
      service: '룸 직배송',
      icon: '🚪',
      description: '호텔 객실로 직접 배송 (제휴 호텔 한정)',
      time: '당일 배송',
      benefit: '객실에서 바로 짐 수령'
    },
    {
      service: '컨시어지 서비스',
      icon: '🛎️',
      description: '호텔 컨시어지를 통한 전용 짐 관리',
      time: '실시간',
      benefit: '24시간 짐 픽업/배송 가능'
    },
    {
      service: '체크아웃 픽업',
      icon: '📦',
      description: '체크아웃 후 다음 숙소나 공항으로 배송',
      time: '당일 배송',
      benefit: '빈손으로 자유롭게 관광'
    }
  ];

  const bookingTips = [
    {
      tip: 'CarryDrop 제휴 숙소 선택',
      description: '제휴 숙소에서는 더 편리하고 안전한 짐 서비스를 이용할 수 있습니다.',
      icon: '🤝'
    },
    {
      tip: '체크인 시간 확인',
      description: '체크인 전 짐 배송 시 호텔 정책을 미리 확인하세요.',
      icon: '⏰'
    },
    {
      tip: '연락처 정확히 입력',
      description: '숙소 담당자와 원활한 소통을 위해 정확한 연락처를 제공하세요.',
      icon: '📞'
    },
    {
      tip: '특별 요청사항 전달',
      description: '깨지기 쉬운 물건이나 특별 보관이 필요한 경우 미리 알려주세요.',
      icon: '💬'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">🏨</span>
              <span className="font-medium">CarryDrop 숙소 안내</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              일본 여행의 완벽한 숙소
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              CarryDrop 제휴 숙소에서 더 편리한 짐 배송 서비스를<br />
              경험하고 스마트한 일본 여행을 즐기세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${lng}/request-delivery`}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
              >
                짐 배송 신청하기
              </Link>
              <Link 
                href="#accommodation-types"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
              >
                숙소 타입 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              주요 도시별 숙소 안내
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              일본 주요 관광 도시의 특색 있는 숙소들을 소개합니다
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cities.map((city, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all transform hover:-translate-y-2">
                <div className="p-8 text-center">
                  <div className="text-6xl mb-4">{city.image}</div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">{city.name}</h3>
                  <p className="text-sm text-gray-500 mb-4 font-medium">{city.nameEn}</p>
                  <p className="text-gray-600 mb-6 leading-relaxed">{city.description}</p>
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-700 mb-3">주요 지역:</h4>
                    <div className="flex flex-wrap gap-2">
                      {city.districts.map((district, districtIndex) => (
                        <span key={districtIndex} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                          {district}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Types */}
      <section id="accommodation-types" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              숙소 타입별 안내
            </h2>
            <p className="text-lg text-gray-600">
              여행 스타일에 맞는 완벽한 숙소를 선택하세요
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {accommodationTypes.map((type, index) => (
              <div key={index} className={`p-8 rounded-2xl border-2 ${type.color} hover:shadow-lg transition-all`}>
                <div className="flex items-start gap-6">
                  <div className="text-5xl">{type.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{type.title}</h3>
                      <span className="text-gray-500">({type.titleEn})</span>
                    </div>
                    <div className="mb-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        {type.price}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{type.bestFor}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">주요 특징:</h4>
                      <ul className="space-y-1">
                        {type.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-800 mb-2">🚚 CarryDrop 혜택:</h4>
                      <p className="text-purple-700 text-sm">{type.carryDropBenefit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Hotels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              CarryDrop 제휴 추천 숙소
            </h2>
            <p className="text-lg text-gray-600">
              안전하고 편리한 짐 서비스를 제공하는 엄선된 숙소들
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {recommendedHotels.map((hotel, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{hotel.image}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3>
                        <p className="text-sm text-gray-500">{hotel.nameEn}</p>
                      </div>
                    </div>
                    {hotel.carryDropPartner && (
                      <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        제휴 숙소
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">도시:</span>
                      <p className="font-semibold text-gray-800">{hotel.city}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">타입:</span>
                      <p className="font-semibold text-gray-800">{hotel.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">평점:</span>
                      <p className="font-semibold text-gray-800">⭐ {hotel.rating}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">가격:</span>
                      <p className="font-semibold text-red-600">{hotel.price}/박</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 mb-3">📍 {hotel.location}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 transition-all">
                      예약하기
                    </button>
                    <Link 
                      href={`/${lng}/request-delivery`}
                      className="flex-1 border border-purple-500 text-purple-500 font-bold py-3 px-6 rounded-lg hover:bg-purple-50 transition-all text-center"
                    >
                      짐 배송 신청
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CarryDrop Services */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              숙소 연계 CarryDrop 서비스
            </h2>
            <p className="text-lg text-gray-600">
              제휴 숙소에서만 경험할 수 있는 특별한 서비스들
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {carryDropServices.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">{service.service}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                <div className="mb-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    {service.time}
                  </span>
                </div>
                <p className="text-xs text-purple-600 font-medium">{service.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Tips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              스마트한 숙소 예약 팁
            </h2>
            <p className="text-lg text-gray-600">
              CarryDrop과 함께하는 완벽한 일본 여행을 위한 팁들
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bookingTips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
                  {tip.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">{tip.tip}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            이제 짐 걱정 없는 일본 여행을!
          </h2>
          <p className="text-xl mb-8 opacity-95">
            CarryDrop 제휴 숙소에서 더욱 편리한 여행을 시작하세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              지금 짐 배송 신청하기
            </Link>
            <Link 
              href={`/${lng}/service-guide`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              서비스 가이드 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 