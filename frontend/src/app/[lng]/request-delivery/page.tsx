'use client';

import React, { useState } from 'react';
import { useTranslation } from '../../../i18n-client';

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

interface PageProps {
  params: {
    lng: string;
  };
}

const RequestDeliveryPage: React.FC<PageProps> = ({ params: { lng } }) => {
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

  const serviceTypes = [
    {
      type: 'STANDARD' as const,
      title: '스탠다드',
      price: '¥2,500',
      time: '4-6시간',
      description: '일반 배송 서비스',
      icon: '📦'
    },
    {
      type: 'EXPRESS' as const,
      title: '익스프레스',
      price: '¥3,800',
      time: '2-3시간',
      description: '빠른 배송 서비스',
      icon: '⚡',
      popular: true
    },
    {
      type: 'PREMIUM' as const,
      title: '프리미엄',
      price: '¥5,500',
      time: '1-2시간',
      description: '럭셔리 배송 서비스',
      icon: '👑'
    }
  ];

  const popularLocations = {
    airports: [
      '하네다 공항 (HND)',
      '나리타 공항 (NRT)',
      '간사이 공항 (KIX)',
      '이타미 공항 (ITM)'
    ],
    areas: [
      '시부야',
      '신주쿠',
      '하라주쿠',
      '아키하바라',
      '긴자',
      '우에노',
      '아사쿠사',
      '도톤보리',
      '난바',
      '우메다'
    ]
  };

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

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // 여기서 API 호출
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setCurrentStep(4); // 완료 단계로 이동
      } else {
        throw new Error('예약에 실패했습니다');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      alert('예약 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">배송 정보 입력</h2>
        <p className="text-gray-600">픽업 장소와 배송 장소를 입력해주세요</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            출발지 (픽업 장소) *
          </label>
          <input
            type="text"
            value={formData.fromPlace}
            onChange={(e) => handleInputChange('fromPlace', e.target.value)}
            placeholder="예: 하네다 공항, 시부야 호텔 등"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.fromPlace ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.fromPlace && <p className="text-red-500 text-sm mt-1">{errors.fromPlace}</p>}
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">인기 장소:</p>
            <div className="flex flex-wrap gap-2">
              {popularLocations.airports.slice(0, 2).map((location) => (
                <button
                  key={location}
                  onClick={() => handleInputChange('fromPlace', location)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            도착지 (배송 장소) *
          </label>
          <input
            type="text"
            value={formData.toPlace}
            onChange={(e) => handleInputChange('toPlace', e.target.value)}
            placeholder="예: 신주쿠 호텔, 에어비앤비 주소 등"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.toPlace ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.toPlace && <p className="text-red-500 text-sm mt-1">{errors.toPlace}</p>}
          
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">인기 지역:</p>
            <div className="flex flex-wrap gap-2">
              {popularLocations.areas.slice(0, 4).map((location) => (
                <button
                  key={location}
                  onClick={() => handleInputChange('toPlace', location)}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            픽업 희망 시간 *
          </label>
          <input
            type="datetime-local"
            value={formData.pickUpTime}
            onChange={(e) => handleInputChange('pickUpTime', e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.pickUpTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.pickUpTime && <p className="text-red-500 text-sm mt-1">{errors.pickUpTime}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배송 희망 시간 *
          </label>
          <input
            type="datetime-local"
            value={formData.dropOffTime}
            onChange={(e) => handleInputChange('dropOffTime', e.target.value)}
            min={formData.pickUpTime || new Date().toISOString().slice(0, 16)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.dropOffTime ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dropOffTime && <p className="text-red-500 text-sm mt-1">{errors.dropOffTime}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          짐 개수
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleInputChange('luggageCount', Math.max(1, formData.luggageCount - 1))}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            -
          </button>
          <span className="text-xl font-semibold w-12 text-center">{formData.luggageCount}</span>
          <button
            onClick={() => handleInputChange('luggageCount', formData.luggageCount + 1)}
            className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            +
          </button>
          <span className="text-gray-600">개</span>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">서비스 타입 선택</h2>
        <p className="text-gray-600">필요에 맞는 배송 서비스를 선택해주세요</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {serviceTypes.map((service) => (
          <div
            key={service.type}
            onClick={() => handleInputChange('serviceType', service.type)}
            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all hover:shadow-lg ${
              formData.serviceType === service.type
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300'
            } ${service.popular ? 'transform scale-105' : ''}`}
          >
            {service.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  인기
                </span>
              </div>
            )}
            
            <div className="text-center">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-2xl font-bold text-red-600 mb-2">{service.price}</p>
              <p className="text-sm text-gray-600 mb-2">배송시간: {service.time}</p>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          특별 요청사항 (선택)
        </label>
        <textarea
          value={formData.specialInstructions}
          onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
          placeholder="예: 깨지기 쉬운 물건 있음, 호텔 프론트 데스크에 맡겨주세요 등"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">고객 정보 입력</h2>
        <p className="text-gray-600">연락을 위한 정보를 입력해주세요</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이름 *
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="홍길동"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            전화번호 *
          </label>
          <input
            type="tel"
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            placeholder="+82-10-1234-5678"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
              errors.customerPhone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.customerPhone && <p className="text-red-500 text-sm mt-1">{errors.customerPhone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          이메일 *
        </label>
        <input
          type="email"
          value={formData.customerEmail}
          onChange={(e) => handleInputChange('customerEmail', e.target.value)}
          placeholder="example@email.com"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
            errors.customerEmail ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.customerEmail && <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>}
      </div>

      {/* 주문 요약 */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-lg font-bold mb-4">주문 요약</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span>출발지:</span>
            <span className="font-medium">{formData.fromPlace}</span>
          </div>
          <div className="flex justify-between">
            <span>도착지:</span>
            <span className="font-medium">{formData.toPlace}</span>
          </div>
          <div className="flex justify-between">
            <span>픽업 시간:</span>
            <span className="font-medium">{new Date(formData.pickUpTime).toLocaleString('ko-KR')}</span>
          </div>
          <div className="flex justify-between">
            <span>배송 시간:</span>
            <span className="font-medium">{new Date(formData.dropOffTime).toLocaleString('ko-KR')}</span>
          </div>
          <div className="flex justify-between">
            <span>짐 개수:</span>
            <span className="font-medium">{formData.luggageCount}개</span>
          </div>
          <div className="flex justify-between">
            <span>서비스 타입:</span>
            <span className="font-medium">{serviceTypes.find(s => s.type === formData.serviceType)?.title}</span>
          </div>
          <hr />
          <div className="flex justify-between text-lg font-bold">
            <span>총 금액:</span>
            <span className="text-red-600">{serviceTypes.find(s => s.type === formData.serviceType)?.price}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-8">
      <div className="text-6xl mb-6">🎉</div>
      <h2 className="text-3xl font-bold text-green-600 mb-4">예약 완료!</h2>
      <p className="text-lg text-gray-600 mb-8">
        배송 예약이 성공적으로 완료되었습니다.<br />
        확인 이메일이 발송되었습니다.
      </p>
      
      <div className="bg-green-50 p-6 rounded-xl inline-block">
        <p className="text-green-800">
          <strong>예약 번호:</strong> #CD{Date.now().toString().slice(-6)}
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
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
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step <= currentStep 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? '✓' : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-red-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>배송 정보</span>
            <span>서비스 선택</span>
            <span>고객 정보</span>
            <span>완료</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`py-3 px-8 rounded-lg font-bold transition-all ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              이전
            </button>
            
            {currentStep === 3 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '예약 중...' : '예약 완료'}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-600 transition-all"
              >
                다음
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDeliveryPage; 