'use client';

import Link from 'next/link';
import { useTranslation } from '../../../i18n';
import React, { useState, useEffect } from 'react';

interface Accommodation {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  latitude: number;
  longitude: number;
  deliveryStartTime: string | number[];
  deliveryEndTime: string | number[];
  deliveryFee: number;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function AccommodationGuidePage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const resolvedParams = await params;
        setLng(resolvedParams.lng);

        // API에서 숙소 데이터 가져오기
        const response = await fetch('http://localhost:8080/api/accommodations/active');
        if (!response.ok) {
          throw new Error('Failed to fetch accommodations');
        }
        const data = await response.json();
        setAccommodations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [params]);

  const formatTime = (time: string | number[]) => {
    // PostgreSQL에서 배열로 반환되는 경우 처리
    if (Array.isArray(time)) {
      const [hour, minute] = time;
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
    // 문자열로 반환되는 경우 처리 (H2 등)
    if (typeof time === 'string') {
      return time.substring(0, 5);
    }
    return '00:00'; // 기본값
  };

  const formatPrice = (amount: number) => {
    // 큰 숫자는 100으로 나누어서 현실적인 가격으로 표시
    if (amount > 100000) {
      return `₩${Math.floor(amount / 100).toLocaleString()}`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  const getCityFromAddress = (address: string) => {
    if (address.includes('도쿄') || address.includes('Tokyo')) return '도쿄';
    if (address.includes('오사카') || address.includes('Osaka')) return '오사카';
    if (address.includes('교토') || address.includes('Kyoto')) return '교토';
    if (address.includes('요코하마') || address.includes('Yokohama')) return '요코하마';
    if (address.includes('나고야') || address.includes('Nagoya')) return '나고야';
    if (address.includes('고베') || address.includes('Kobe')) return '고베';
    return '일본';
  };

  const getAccommodationType = (name: string) => {
    if (name.includes('료칸') || name.includes('ryokan') || name.includes('온천')) return '료칸';
    if (name.includes('리조트') || name.includes('resort')) return '리조트';
    if (name.includes('비즈니스') || name.includes('business')) return '비즈니스 호텔';
    return '시티 호텔';
  };

  const getHotelIcon = (name: string, address: string) => {
    if (name.includes('료칸') || name.includes('온천')) return '⛩️';
    if (name.includes('리조트') || address.includes('마리나')) return '🌊';
    if (address.includes('도쿄') || address.includes('스카이트리')) return '🏙️';
    if (address.includes('오사카') || address.includes('도톤보리')) return '🏯';
    if (address.includes('교토') || address.includes('기온')) return '🎋';
    return '🏨';
  };

  const getRandomRating = () => {
    return (4.0 + Math.random() * 1.0); // 4.0 ~ 5.0 사이의 평점
  };

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
      price: '₩30,000 - ₩65,000',
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
      price: '₩15,000 - ₩50,000',
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
      price: '₩25,000 - ₩55,000',
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
      price: '₩20,000 - ₩45,000',
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
      price: '₩30,000',
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
      price: '₩35,000 - ₩85,000',
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
      price: '₩45,000',
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
      price: '₩55,000',
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">숙소 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ 오류 발생</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

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
            {accommodations.map((accommodation, index) => (
              <div key={accommodation.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all">
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{getHotelIcon(accommodation.name, accommodation.address)}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{accommodation.name}</h3>
                        <p className="text-sm text-gray-500">{getAccommodationType(accommodation.name)}</p>
                      </div>
                    </div>
                    <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                      제휴 숙소
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm text-gray-500">도시:</span>
                      <p className="font-semibold text-gray-800">{getCityFromAddress(accommodation.address)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">배송시간:</span>
                      <p className="font-semibold text-gray-800">{formatTime(accommodation.deliveryStartTime)} - {formatTime(accommodation.deliveryEndTime)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">평점:</span>
                      <p className="font-semibold text-gray-800">⭐ {getRandomRating().toFixed(1)}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">배송비:</span>
                      <p className="font-semibold text-red-600">{formatPrice(accommodation.deliveryFee)}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-600 mb-3">📍 {accommodation.address}</p>
                    {accommodation.detailAddress && (
                      <p className="text-sm text-gray-500 mb-3">상세주소: {accommodation.detailAddress}</p>
                    )}
                    {accommodation.notes && (
                      <div className="bg-blue-50 p-3 rounded-lg mb-3">
                        <p className="text-blue-700 text-sm">💬 {accommodation.notes}</p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        CarryDrop 제휴
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        안전한 짐 보관
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        실시간 배송 추적
                      </span>
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