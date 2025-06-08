'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

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

export default function HotelsPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
      await fetchAccommodations();
    };
    initializePage();
  }, [params]);

  const fetchAccommodations = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/accommodations/active');
      if (!response.ok) {
        throw new Error('Failed to fetch accommodations');
      }
      const data = await response.json();
      setAccommodations(data);
    } catch (err) {
      console.error('Error fetching accommodations:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Fallback 데이터 사용
      setAccommodations([
        {
          id: '1',
          name: '도쿄 임페리얼 호텔',
          address: '도쿄도 치요다구 우치사이와이초 1-1-1',
          latitude: 35.6751,
          longitude: 139.7590,
          deliveryStartTime: '08:00',
          deliveryEndTime: '20:00',
          deliveryFee: 4000000,
          isActive: true,
          notes: '황궁 근처 럭셔리 호텔',
          createdAt: '2024-01-16T10:00:00Z',
          updatedAt: '2024-01-16T10:00:00Z'
        },
        {
          id: '2',
          name: '오사카 그랜드 호텔',
          address: '오사카부 오사카시 기타구 나카노시마 5-3-68',
          latitude: 34.6937,
          longitude: 135.5023,
          deliveryStartTime: '07:00',
          deliveryEndTime: '21:00',
          deliveryFee: 3500000,
          isActive: true,
          notes: '나카노시마 파크 인근',
          createdAt: '2024-01-16T10:00:00Z',
          updatedAt: '2024-01-16T10:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string | number[]) => {
    if (Array.isArray(time)) {
      const [hour, minute] = time;
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
    if (typeof time === 'string') {
      return time.substring(0, 5);
    }
    return '00:00';
  };

  const formatPrice = (amount: number) => {
    if (amount > 100000) {
      return `₩${Math.floor(amount / 100).toLocaleString()}`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  const getHotelType = (name: string) => {
    if (name.includes('료칸') || name.includes('헤리티지')) return '전통 료칸';
    if (name.includes('비즈니스') || name.includes('Business')) return '비즈니스 호텔';
    if (name.includes('리조트') || name.includes('Resort')) return '리조트';
    if (name.includes('그랜드') || name.includes('임페리얼') || name.includes('프린스')) return '럭셔리 호텔';
    return '시티 호텔';
  };

  const getCity = (address: string) => {
    if (address.includes('도쿄') || address.includes('Tokyo')) return '도쿄';
    if (address.includes('오사카') || address.includes('Osaka')) return '오사카';
    if (address.includes('교토') || address.includes('Kyoto')) return '교토';
    if (address.includes('요코하마') || address.includes('Yokohama')) return '요코하마';
    if (address.includes('나고야') || address.includes('Nagoya')) return '나고야';
    if (address.includes('고베') || address.includes('Kobe')) return '고베';
    return '기타';
  };

  const hotelTypes = [
    {
      type: '럭셔리 호텔',
      description: '최고급 서비스와 편의시설을 제공하는 5성급 호텔',
      features: ['컨시어지 서비스', '24시간 룸서비스', '고급 스파', '미슐랭 레스토랑'],
      icon: '👑',
      count: accommodations.filter(hotel => getHotelType(hotel.name) === '럭셔리 호텔').length
    },
    {
      type: '전통 료칸',
      description: '일본 전통 문화를 체험할 수 있는 료칸',
      features: ['다다미 객실', '온천', '가이세키 요리', '유카타 제공'],
      icon: '🏯',
      count: accommodations.filter(hotel => getHotelType(hotel.name) === '전통 료칸').length
    },
    {
      type: '비즈니스 호텔',
      description: '합리적인 가격의 실용적인 숙박 시설',
      features: ['무료 WiFi', '세탁 서비스', '24시간 체크인', '편의점 인근'],
      icon: '🏢',
      count: accommodations.filter(hotel => getHotelType(hotel.name) === '비즈니스 호텔').length
    },
    {
      type: '시티 호텔',
      description: '도심 중심가에 위치한 편리한 호텔',
      features: ['교통 편의성', '쇼핑센터 인근', '관광지 접근성', '다양한 레스토랑'],
      icon: '🌆',
      count: accommodations.filter(hotel => getHotelType(hotel.name) === '시티 호텔').length
    }
  ];

  const cities = ['전체', '도쿄', '오사카', '교토', '요코하마', '나고야', '고베'];
  const [selectedCity, setSelectedCity] = useState('전체');

  const filteredAccommodations = selectedCity === '전체' 
    ? accommodations 
    : accommodations.filter(hotel => getCity(hotel.address) === selectedCity);

  const partnershipBenefits = [
    {
      title: '안전한 배송',
      description: '제휴 숙소의 전문 직원이 직접 관리',
      icon: '🔐',
      details: ['숙소 직원 확인', '안전한 보관 공간', '실시간 상태 알림']
    },
    {
      title: '빠른 처리',
      description: '사전 협의된 프로세스로 신속한 처리',
      icon: '⚡',
      details: ['전용 접수 창구', '우선 처리', '최소 대기 시간']
    },
    {
      title: '특별 혜택',
      description: '제휴 숙소 이용객만의 특별한 혜택',
      icon: '🎁',
      details: ['배송비 할인', '멤버십 포인트', '우선 예약']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">🏨</span>
              <span className="font-medium">CarryDrop 제휴 숙소</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              신뢰할 수 있는<br />제휴 숙소 네트워크
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              전국 {accommodations.length}개 숙소와 함께<br />
              안전하고 편리한 배송 서비스를 제공합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/${lng}/request-delivery`}
                className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
              >
                제휴 숙소로 배송 신청
              </Link>
              <Link 
                href={`/${lng}/accommodation-guide`}
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
              >
                숙소 안내 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              숙소 유형별 서비스
            </h2>
            <p className="text-lg text-gray-600">
              다양한 유형의 숙소에서 CarryDrop 서비스를 이용하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {hotelTypes.map((type, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{type.type}</h3>
                <p className="text-gray-600 mb-6 text-sm">{type.description}</p>
                <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                  {type.count}개 숙소
                </div>
                <ul className="space-y-2">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-purple-500">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Filter */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              지역별 제휴 숙소
            </h2>
            <p className="text-lg text-gray-600">
              원하는 지역의 제휴 숙소를 확인해보세요
            </p>
          </div>

          {/* City Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                }`}
              >
                {city}
                {city !== '전체' && (
                  <span className="ml-2 text-sm">
                    ({accommodations.filter(hotel => getCity(hotel.address) === city).length})
                  </span>
                )}
                {city === '전체' && (
                  <span className="ml-2 text-sm">({accommodations.length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Accommodations List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              <p className="mt-4 text-gray-600">제휴 숙소 정보를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-gray-600 mb-4">숙소 정보를 불러올 수 없습니다</p>
              <p className="text-sm text-gray-500">샘플 데이터로 표시됩니다</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAccommodations.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl p-8 shadow-sm border hover:shadow-lg transition-all">
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{hotel.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-medium">
                            {getHotelType(hotel.name)}
                          </span>
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
                            {getCity(hotel.address)}
                          </span>
                        </div>
                      </div>
                      <div className="text-4xl">🏨</div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{hotel.address}</p>
                    {hotel.notes && (
                      <p className="text-gray-500 text-sm mb-4 italic">{hotel.notes}</p>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">배송 시간</span>
                      <span className="font-bold text-gray-800">
                        {formatTime(hotel.deliveryStartTime)} - {formatTime(hotel.deliveryEndTime)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">배송비</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {formatPrice(hotel.deliveryFee)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-sm text-gray-600">CarryDrop 공식 제휴</span>
                    </div>
                  </div>

                  <Link 
                    href={`/${lng}/request-delivery`}
                    className="w-full bg-purple-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-600 transition-all text-center block"
                  >
                    이 숙소로 배송 신청
                  </Link>
                </div>
              ))}
            </div>
          )}

          {filteredAccommodations.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏨</div>
              <p className="text-gray-600 mb-4">선택하신 지역에 제휴 숙소가 없습니다</p>
              <p className="text-sm text-gray-500">다른 지역을 선택해보세요</p>
            </div>
          )}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              제휴 숙소만의 특별한 혜택
            </h2>
            <p className="text-lg text-gray-600">
              CarryDrop과 함께하는 숙소에서만 누릴 수 있는 혜택들
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-6">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details.map((detail, detailIndex) => (
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

      {/* How to Become Partner */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              CarryDrop 제휴 숙소가 되세요
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              고객에게는 편의를, 숙소에게는 새로운 수익 기회를 제공합니다
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">추가 수익</h3>
                <p className="text-gray-600 text-sm">배송 건당 수수료와 추가 서비스 수익 창출</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">고객 만족도 향상</h3>
                <p className="text-gray-600 text-sm">편리한 서비스로 고객 재방문율 증대</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">전문 지원</h3>
                <p className="text-gray-600 text-sm">전담 매니저와 24시간 기술 지원</p>
              </div>
            </div>

            <Link 
              href={`/${lng}/partnership`}
              className="bg-purple-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105 inline-block"
            >
              제휴 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            신뢰할 수 있는 제휴 숙소에서<br />CarryDrop을 경험하세요
          </h2>
          <p className="text-xl mb-8 opacity-95">
            전국 {accommodations.length}개 제휴 숙소가 여러분을 기다립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              지금 배송 신청하기
            </Link>
            <Link 
              href={`/${lng}/membership`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              멤버십 혜택 보기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 