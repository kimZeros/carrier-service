'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../../i18n-client';
import { useParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface ReservationFormData {
  fromPlace: string;
  toPlace: string;
  pickUpTime: string;
  dropOffTime: string;
  luggageCount: number;
  serviceType: 'STANDARD' | 'EXPRESS' | 'PREMIUM';
  specialInstructions: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

const RequestDeliveryPage: React.FC = () => {
  const params = useParams();
  const lng = params.lng as string;
  const { t } = useTranslation(lng, 'common');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ReservationFormData>({
    fromPlace: '',
    toPlace: '',
    pickUpTime: '',
    dropOffTime: '',
    luggageCount: 1,
    serviceType: 'STANDARD',
    specialInstructions: '',
    customerName: '',
    customerPhone: '',
    customerEmail: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ReservationFormData>>({});

  const [selectedFromRegion, setSelectedFromRegion] = useState<string>('');
  const [selectedToRegion, setSelectedToRegion] = useState<string>('');
  const [pickUpDate, setPickUpDate] = useState<Date | null>(null);
  const [dropOffDate, setDropOffDate] = useState<Date | null>(null);

  const locationData = {
    airports: {
      '도쿄': ['하네다 공항 (HND)', '나리타 공항 (NRT)'],
      '오사카': ['간사이 공항 (KIX)', '이타미 공항 (ITM)'],
      '교토': ['간사이 공항 (KIX)'],
      '고베': ['간사이 공항 (KIX)', '이타미 공항 (ITM)']
    },
    areas: {
      '도쿄': ['시부야', '신주쿠', '하라주쿠', '아키하바라', '긴자', '우에노', '아사쿠사'],
      '오사카': ['도톤보리', '난바', '우메다', '신사이바시', '아메무라'],
      '교토': ['기온', '아라시야마', '후시미', '키요미즈데라 주변', '금각사 주변'],
      '고베': ['산노미야', '모토마치', '하버랜드', '기타노', '난킨마치']
    }
  };

  const popularLocations = {
    regions: ['도쿄', '오사카', '교토', '고베'],
    airports: Object.values(locationData.airports).flat(),
    areas: Object.values(locationData.areas).flat()
  };

  // 지역간 이동 제한: 출발지와 동일한 지역으로 도착지 자동 설정
  useEffect(() => {
    if (selectedFromRegion) {
      setSelectedToRegion(selectedFromRegion);
      setFormData(prev => ({ ...prev, toPlace: '' }));
    }
  }, [selectedFromRegion]);

  const serviceTypes = [
    {
      type: 'STANDARD' as const,
      title: '스탠다드',
      basePrice: 2500,
      time: '4-6시간',
      description: '일반 배송 서비스',
      icon: '📦'
    },
    {
      type: 'EXPRESS' as const,
      title: '익스프레스',
      basePrice: 3800,
      time: '2-3시간',
      description: '빠른 배송 서비스',
      icon: '⚡',
      popular: true
    },
    {
      type: 'PREMIUM' as const,
      title: '프리미엄',
      basePrice: 5500,
      time: '1-2시간',
      description: '럭셔리 배송 서비스',
      icon: '👑'
    }
  ];

  const handleInputChange = (field: keyof ReservationFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<ReservationFormData> = {};

    if (step === 1) {
      if (!formData.fromPlace.trim()) newErrors.fromPlace = '출발지를 입력해주세요';
      if (!formData.toPlace.trim()) newErrors.toPlace = '도착지를 입력해주세요';
      if (!formData.pickUpTime) newErrors.pickUpTime = '픽업 시간을 선택해주세요';
      if (!formData.dropOffTime) newErrors.dropOffTime = '배송 시간을 선택해주세요';
    }

    if (step === 3) {
      if (!formData.customerName.trim()) newErrors.customerName = '이름을 입력해주세요';
      if (!formData.customerPhone.trim()) newErrors.customerPhone = '전화번호를 입력해주세요';
      if (!formData.customerEmail.trim()) newErrors.customerEmail = '이메일을 입력해주세요';
      else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
        newErrors.customerEmail = '올바른 이메일 형식이 아닙니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const formatPrice = (price: number) => {
    // 기본 배송료 계산 (25,000원 - 65,000원 범위)
    const basePrice = Math.max(25000, Math.min(65000, price));
    return `₩${basePrice.toLocaleString()}`;
  };

  const getServicePrice = (serviceType: 'STANDARD' | 'EXPRESS' | 'PREMIUM') => {
    const basePrice = 2500;
    const luggageMultiplier = formData.luggageCount;
    const serviceMultiplier = serviceType === 'EXPRESS' ? 1.5 : serviceType === 'PREMIUM' ? 2.2 : 1;
    
    return Math.floor(basePrice * luggageMultiplier * serviceMultiplier);
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // 일시적으로 사용자 생성 (인증 시스템 구현 전)
      const userResponse = await fetch('http://localhost:8080/api/auth/temp-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone
        }),
      });

      let userId;
      if (userResponse.ok) {
        const userData = await userResponse.json();
        userId = userData.id;
      } else {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || '사용자 등록에 실패했습니다');
      }

      // 예약 생성
      const reservationData = {
        fromPlace: formData.fromPlace,
        toPlace: formData.toPlace,
        pickUpTime: new Date(formData.pickUpTime).toISOString(),
        dropOffTime: new Date(formData.dropOffTime).toISOString(),
        price: getServicePrice(formData.serviceType)
      };

      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        setCurrentStep(4); // 완료 단계로 이동
      } else {
        const errorData = await response.text();
        throw new Error(`예약에 실패했습니다: ${errorData}`);
      }
    } catch (error: any) {
      console.error('Reservation error:', error);
      alert(`예약 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">배송 정보 입력</h2>
        <p className="text-xl text-gray-800 font-medium">픽업 장소와 배송 장소를 정확히 입력해주세요</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 출발지 입력 */}
        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-900 mb-4">
            🛫 출발지 (픽업 장소)
          </label>
          <input
            type="text"
            value={formData.fromPlace}
            onChange={(e) => handleInputChange('fromPlace', e.target.value)}
            className={`w-full p-5 border-3 rounded-xl text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 ${
              errors.fromPlace ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 focus:border-red-500 text-gray-900 bg-white'
            }`}
            placeholder="예시: 간사이 공항 또는 도톤보리 호텔"
          />
          {errors.fromPlace && (
            <p className="text-red-600 text-base font-semibold flex items-center">
              <span className="mr-2">⚠️</span>
              {errors.fromPlace}
            </p>
          )}
          
          {/* 지역 선택 */}
          <div className="space-y-3">
            <p className="text-base font-bold text-gray-900">1️⃣ 지역 선택:</p>
            <div className="flex flex-wrap gap-2">
              {popularLocations.regions.map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedFromRegion(region);
                    setFormData(prev => ({ ...prev, fromPlace: '' }));
                  }}
                  className={`px-4 py-2 text-base font-medium rounded-full transition-colors border-2 ${
                    selectedFromRegion === region
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-gray-200 hover:bg-red-100 text-gray-900 border-gray-300 hover:border-red-400 hover:text-red-700'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* 공항 목록 */}
          {selectedFromRegion && locationData.airports[selectedFromRegion as keyof typeof locationData.airports] && (
            <div className="space-y-3">
              <p className="text-base font-bold text-gray-900">2️⃣ 공항 선택:</p>
              <div className="flex flex-wrap gap-2">
                {locationData.airports[selectedFromRegion as keyof typeof locationData.airports].map((airport) => (
                  <button
                    key={airport}
                    onClick={() => handleInputChange('fromPlace', airport)}
                    className={`px-4 py-2 text-base font-medium rounded-full transition-colors border-2 ${
                      formData.fromPlace === airport
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 hover:border-blue-400'
                    }`}
                  >
                    {airport}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 지역 내 장소 목록 */}
          {selectedFromRegion && locationData.areas[selectedFromRegion as keyof typeof locationData.areas] && (
            <div className="space-y-3">
              <p className="text-base font-bold text-gray-900">2️⃣ 지역 내 장소 선택:</p>
              <div className="flex flex-wrap gap-2">
                {locationData.areas[selectedFromRegion as keyof typeof locationData.areas].map((area) => (
                  <button
                    key={area}
                    onClick={() => handleInputChange('fromPlace', area)}
                    className={`px-4 py-2 text-base font-medium rounded-full transition-colors border-2 ${
                      formData.fromPlace === area
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300 hover:border-green-400'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 도착지 입력 */}
        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-900 mb-4">
            🏨 도착지 (배송 장소)
          </label>
          <input
            type="text"
            value={formData.toPlace}
            onChange={(e) => handleInputChange('toPlace', e.target.value)}
            className={`w-full p-5 border-3 rounded-xl text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-red-300 focus:border-red-500 ${
              errors.toPlace ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 focus:border-red-500 text-gray-900 bg-white'
            }`}
            placeholder="예시: 우메다 숙소 또는 간사이 공항"
          />
          {errors.toPlace && (
            <p className="text-red-600 text-base font-semibold flex items-center">
              <span className="mr-2">⚠️</span>
              {errors.toPlace}
            </p>
          )}
          
          {selectedFromRegion && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <p className="text-yellow-800 font-medium text-sm">
                💡 지역간 이동은 제공하지 않습니다. 도착지는 <strong>{selectedFromRegion}</strong> 지역 내에서만 선택 가능합니다.
              </p>
            </div>
          )}

          {/* 공항 목록 */}
          {selectedToRegion && locationData.airports[selectedToRegion as keyof typeof locationData.airports] && (
            <div className="space-y-3">
              <p className="text-base font-bold text-gray-900">✈️ 공항 선택:</p>
              <div className="flex flex-wrap gap-2">
                {locationData.airports[selectedToRegion as keyof typeof locationData.airports].map((airport) => (
                  <button
                    key={airport}
                    onClick={() => handleInputChange('toPlace', airport)}
                    className={`px-4 py-2 text-base font-medium rounded-full transition-colors border-2 ${
                      formData.toPlace === airport
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800 border-blue-300 hover:border-blue-400'
                    }`}
                  >
                    {airport}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 지역 내 장소 목록 */}
          {selectedToRegion && locationData.areas[selectedToRegion as keyof typeof locationData.areas] && (
            <div className="space-y-3">
              <p className="text-base font-bold text-gray-900">🏢 지역 내 장소 선택:</p>
              <div className="flex flex-wrap gap-2">
                {locationData.areas[selectedToRegion as keyof typeof locationData.areas].map((area) => (
                  <button
                    key={area}
                    onClick={() => handleInputChange('toPlace', area)}
                    className={`px-4 py-2 text-base font-medium rounded-full transition-colors border-2 ${
                      formData.toPlace === area
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-green-100 hover:bg-green-200 text-green-800 border-green-300 hover:border-green-400'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 시간 설정 */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border-2 border-blue-200 mt-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📅 픽업 및 배송 시간 설정</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border-2 border-gray-300 shadow-lg">
            <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">⏰</span>
              픽업 희망 시간
            </label>
            <div className="space-y-4">
              <DatePicker
                selected={pickUpDate}
                onChange={(date) => {
                  setPickUpDate(date);
                  handleInputChange('pickUpTime', date?.toISOString() || '');
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText="픽업 날짜와 시간을 선택하세요"
                className={`w-full p-5 border-3 rounded-xl text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-500 ${
                  errors.pickUpTime ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 focus:border-blue-500 text-gray-900 bg-gray-50'
                }`}
                minDate={new Date()}
                maxDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}
              />
              {pickUpDate && (
                <div className="bg-blue-100 p-4 rounded-lg border border-blue-300">
                  <p className="text-blue-800 font-medium">
                    📌 선택된 픽업 시간: <span className="font-bold">{pickUpDate.toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      weekday: 'long'
                    })}</span>
                  </p>
                </div>
              )}
              {errors.pickUpTime && (
                <p className="text-red-600 text-base font-semibold flex items-center">
                  <span className="mr-2">⚠️</span>
                  {errors.pickUpTime}
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border-2 border-gray-300 shadow-lg">
            <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              배송 희망 시간
            </label>
            <div className="space-y-4">
              <DatePicker
                selected={dropOffDate}
                onChange={(date) => {
                  setDropOffDate(date);
                  handleInputChange('dropOffTime', date?.toISOString() || '');
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="yyyy-MM-dd HH:mm"
                placeholderText="배송 날짜와 시간을 선택하세요"
                className={`w-full p-5 border-3 rounded-xl text-lg font-medium transition-all focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-500 ${
                  errors.dropOffTime ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 focus:border-green-500 text-gray-900 bg-gray-50'
                }`}
                minDate={pickUpDate || new Date()}
                maxDate={new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)}
              />
              {dropOffDate && (
                <div className="bg-green-100 p-4 rounded-lg border border-green-300">
                  <p className="text-green-800 font-medium">
                    📌 선택된 배송 시간: <span className="font-bold">{dropOffDate.toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      weekday: 'long'
                    })}</span>
                  </p>
                </div>
              )}
              {errors.dropOffTime && (
                <p className="text-red-600 text-base font-semibold flex items-center">
                  <span className="mr-2">⚠️</span>
                  {errors.dropOffTime}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 짐 개수 */}
      <div className="bg-gray-100 p-8 rounded-xl border-2 border-gray-300">
        <label className="block text-lg font-bold text-gray-900 mb-5">
          🧳 캐리어 개수
        </label>
        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={() => handleInputChange('luggageCount', Math.max(1, formData.luggageCount - 1))}
            className="w-16 h-16 bg-white border-3 border-gray-400 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-red-50 hover:border-red-400 transition-colors text-gray-900"
          >
            −
          </button>
          <span className="text-3xl font-bold text-gray-900 min-w-[4rem] text-center">
            {formData.luggageCount}
          </span>
          <button
            type="button"
            onClick={() => handleInputChange('luggageCount', Math.min(5, formData.luggageCount + 1))}
            className="w-16 h-16 bg-white border-3 border-gray-400 rounded-xl flex items-center justify-center text-2xl font-bold hover:bg-red-50 hover:border-red-400 transition-colors text-gray-900"
          >
            +
          </button>
          <span className="text-base font-bold text-gray-800 ml-6">최대 5개까지</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">서비스 타입 선택</h2>
        <p className="text-xl text-gray-800 font-medium">필요에 맞는 배송 서비스를 선택해주세요</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {serviceTypes.map((service) => (
          <div
            key={service.type}
            onClick={() => handleInputChange('serviceType', service.type)}
            className={`relative p-8 rounded-2xl border-3 cursor-pointer transition-all hover:shadow-xl transform hover:-translate-y-1 ${
              formData.serviceType === service.type
                ? 'border-red-500 bg-red-50 shadow-lg'
                : 'border-gray-300 hover:border-gray-400 bg-white'
            } ${service.popular ? 'scale-105' : ''}`}
          >
            {service.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-500 text-white px-6 py-2 rounded-full text-base font-bold shadow-lg">
                  🔥 인기
                </span>
              </div>
            )}
            
            <div className="text-center">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
              <p className="text-3xl font-bold text-red-600 mb-3">{formatPrice(getServicePrice(service.type))}</p>
              <p className="text-base font-semibold text-gray-800 mb-2">배송시간: {service.time}</p>
              <p className="text-gray-800 font-medium">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
        <label className="block text-lg font-bold text-gray-900 mb-3">
          💬 특별 요청사항 (선택)
        </label>
        <textarea
          value={formData.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
          placeholder="예: 깨지기 쉬운 물건 있음, 호텔 프론트 데스크에 맡겨주세요 등"
          rows={4}
          className="w-full px-5 py-4 border-2 border-gray-400 rounded-lg focus:ring-4 focus:ring-red-300 focus:border-red-500 text-gray-900 font-medium text-base bg-white"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">고객 정보 입력</h2>
        <p className="text-xl text-gray-800 font-medium">연락을 위한 정보를 입력해주세요</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            👤 이름 *
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="홍길동"
            className={`w-full px-5 py-4 border-3 rounded-lg focus:ring-4 focus:ring-red-300 focus:border-red-500 text-lg font-medium ${
              errors.customerName ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 text-gray-900 bg-white'
            }`}
          />
          {errors.customerName && <p className="text-red-600 text-base font-semibold mt-2">{errors.customerName}</p>}
        </div>

        <div>
          <label className="block text-lg font-bold text-gray-900 mb-3">
            📞 전화번호 *
          </label>
          <input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            placeholder="+82-10-1234-5678"
            className={`w-full px-5 py-4 border-3 rounded-lg focus:ring-4 focus:ring-red-300 focus:border-red-500 text-lg font-medium ${
              errors.customerPhone ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 text-gray-900 bg-white'
            }`}
          />
          {errors.customerPhone && <p className="text-red-600 text-base font-semibold mt-2">{errors.customerPhone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-lg font-bold text-gray-900 mb-3">
          📧 이메일 *
        </label>
        <input
          type="email"
          value={formData.customerEmail}
          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
          placeholder="example@email.com"
          className={`w-full px-5 py-4 border-3 rounded-lg focus:ring-4 focus:ring-red-300 focus:border-red-500 text-lg font-medium ${
            errors.customerEmail ? 'border-red-500 bg-red-50 text-red-900' : 'border-gray-400 text-gray-900 bg-white'
          }`}
        />
        {errors.customerEmail && <p className="text-red-600 text-base font-semibold mt-2">{errors.customerEmail}</p>}
      </div>

      {/* 주문 요약 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 text-center">📋 주문 요약</h3>
        <div className="space-y-4 text-gray-900">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300">
            <span className="font-semibold">🛫 출발지:</span>
            <span className="font-bold text-gray-900">{formData.fromPlace}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300">
            <span className="font-semibold">🏨 도착지:</span>
            <span className="font-bold text-gray-900">{formData.toPlace}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300">
            <span className="font-semibold">⏰ 픽업 시간:</span>
            <span className="font-bold text-gray-900">{new Date(formData.pickUpTime).toLocaleString('ko-KR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300">
            <span className="font-semibold">🎯 배송 시간:</span>
            <span className="font-bold text-gray-900">{new Date(formData.dropOffTime).toLocaleString('ko-KR')}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300">
            <span className="font-semibold">🧳 짐 개수:</span>
            <span className="font-bold text-gray-900">{formData.luggageCount}개</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300">
            <span className="font-semibold">🚚 서비스 타입:</span>
            <span className="font-bold text-gray-900">{serviceTypes.find(s => s.type === formData.serviceType)?.title}</span>
          </div>
          <hr className="border-gray-400" />
          <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg border-2 border-red-300">
            <span className="text-xl font-bold text-gray-900">💰 총 금액:</span>
            <span className="text-2xl font-bold text-red-600">{formatPrice(getServicePrice(formData.serviceType))}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-8">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold text-green-600 mb-4">예약 완료!</h2>
      <p className="text-lg text-gray-700 mb-8">
        배송 예약이 성공적으로 완료되었습니다.<br />
        확인 이메일이 발송되었습니다.
      </p>
      
      <div className="bg-green-50 p-6 rounded-xl inline-block">
        <p className="text-green-800">
          <strong>예약 번호:</strong> #CD{Date.now().toString().slice(-6)}
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-700">
          픽업 시간 30분 전에 SMS로 알림을 보내드립니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = `/${lng}`}
            className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all"
          >
            홈으로 돌아가기
          </button>
          <button className="border border-red-500 text-red-500 font-bold py-3 px-8 rounded-lg hover:bg-red-50 transition-all">
            예약 내역 확인
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Enhanced Progress Bar */}
        <div className="mb-12 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            {[
              { step: 1, icon: '📍', label: '배송 정보' },
              { step: 2, icon: '🚚', label: '서비스 선택' },
              { step: 3, icon: '👤', label: '고객 정보' },
              { step: 4, icon: '✅', label: '완료' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`relative w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-lg border-3 transition-all duration-300 shadow-lg ${
                  item.step <= currentStep 
                    ? 'bg-gradient-to-br from-red-500 to-red-600 text-white border-red-500 transform scale-110' 
                    : 'bg-gray-200 text-gray-600 border-gray-300'
                }`}>
                  <div className="text-xl">{item.step < currentStep ? '✓' : item.icon}</div>
                </div>
                {index < 3 && (
                  <div className={`w-24 h-1 mx-4 rounded-full transition-all duration-300 ${
                    item.step < currentStep ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-base font-bold text-gray-800">
            <span className={currentStep >= 1 ? 'text-red-600' : 'text-gray-600'}>배송 정보</span>
            <span className={currentStep >= 2 ? 'text-red-600' : 'text-gray-600'}>서비스 선택</span>
            <span className={currentStep >= 3 ? 'text-red-600' : 'text-gray-600'}>고객 정보</span>
            <span className={currentStep >= 4 ? 'text-red-600' : 'text-gray-600'}>완료</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`py-4 px-8 rounded-xl font-bold text-lg transition-all transform border-2 ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900 border-gray-400 hover:border-gray-500 hover:-translate-y-1 hover:shadow-lg'
              }`}
            >
              ⬅️ 이전
            </button>
            
            {currentStep === 3 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg py-4 px-10 rounded-xl hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 hover:shadow-xl border-2 border-red-600"
              >
                {isSubmitting ? '⏳ 예약 중...' : '🎯 예약 완료'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg py-4 px-10 rounded-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:-translate-y-1 hover:shadow-xl border-2 border-red-600"
              >
                다음 ➡️
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDeliveryPage; 