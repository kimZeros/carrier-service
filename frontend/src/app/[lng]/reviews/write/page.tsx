'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function WriteReviewPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [formData, setFormData] = useState({
    serviceType: '',
    rating: 0,
    title: '',
    content: '',
    name: '',
    email: '',
    phone: '',
    agreeTerms: false
  });

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const serviceTypes = [
    { value: 'airport-hotel', label: '공항 → 호텔', icon: '🛫' },
    { value: 'hotel-hotel', label: '호텔 → 호텔', icon: '🏨' },
    { value: 'hotel-airport', label: '호텔 → 공항', icon: '✈️' },
    { value: 'storage', label: '보관 서비스', icon: '📦' }
  ];

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.serviceType) {
      alert('서비스 유형을 선택해주세요.');
      return;
    }
    if (formData.rating === 0) {
      alert('평점을 선택해주세요.');
      return;
    }
    if (!formData.title.trim()) {
      alert('후기 제목을 입력해주세요.');
      return;
    }
    if (!formData.content.trim()) {
      alert('후기 내용을 입력해주세요.');
      return;
    }
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!formData.agreeTerms) {
      alert('개인정보 수집에 동의해주세요.');
      return;
    }

    // 후기 제출 (목업)
    alert('후기가 성공적으로 제출되었습니다! 검토 후 24시간 내에 게시됩니다.');
    
    // 후기 페이지로 리다이렉트
    window.location.href = `/${lng}/reviews`;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">✍️</span>
              <span className="font-medium">후기 작성하기</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              여러분의 소중한 경험을<br />다른 분들과 공유해주세요
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              CarryDrop 서비스는 어떠셨나요?<br />
              솔직한 후기로 더 나은 서비스를 만들어갑니다
            </p>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border p-8">
              
              {/* Service Type Selection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">어떤 서비스를 이용하셨나요?</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {serviceTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('serviceType', type.value)}
                      className={`p-6 rounded-2xl border-2 transition-all text-center ${
                        formData.serviceType === type.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <div className="font-bold">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">전체적인 만족도는 어떠셨나요?</h2>
                <div className="text-center">
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className={`text-6xl transition-all hover:scale-110 ${
                          star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <p className="text-lg text-gray-600">
                      {formData.rating === 5 && '정말 만족해요! 😊'}
                      {formData.rating === 4 && '만족해요! 👍'}
                      {formData.rating === 3 && '보통이에요 😐'}
                      {formData.rating === 2 && '아쉬워요 😞'}
                      {formData.rating === 1 && '불만족해요 😔'}
                    </p>
                  )}
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">후기를 작성해주세요</h2>
                
                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    후기 제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="간단한 제목을 입력해주세요 (예: 정말 편리했어요!)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    maxLength={50}
                  />
                  <p className="text-sm text-gray-500 mt-2">{formData.title.length}/50</p>
                </div>

                <div className="mb-6">
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    상세 후기 *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="CarryDrop 서비스 이용 경험을 자세히 알려주세요. 어떤 점이 좋았는지, 개선했으면 하는 점이 있는지 솔직하게 작성해주시면 더 나은 서비스를 만드는데 큰 도움이 됩니다."
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
                    maxLength={1000}
                  />
                  <p className="text-sm text-gray-500 mt-2">{formData.content.length}/1000</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">연락처 정보</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      이름 *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="실명을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      연락처
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * 연락처 정보는 후기 확인 및 문의 응답을 위해서만 사용되며, 공개되지 않습니다.
                </p>
              </div>

              {/* Terms Agreement */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="mt-1 w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">개인정보 수집 및 이용에 동의합니다. *</span>
                    <p className="mt-2">
                      수집 목적: 후기 확인, 문의 응답<br />
                      수집 항목: 이름, 이메일, 연락처<br />
                      보유 기간: 후기 게시 기간 동안
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lng}/reviews`}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all text-center"
                >
                  취소
                </Link>
                <button
                  type="submit"
                  className="px-8 py-4 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105"
                >
                  후기 제출하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Writing Tips */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              좋은 후기 작성 팁
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mb-6">
                  ✅
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">이런 내용을 포함해주세요</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>실제 이용한 서비스 경험</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>직원의 서비스 품질</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>배송 시간의 정확성</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>짐의 안전한 보관 상태</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>가격 대비 만족도</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mb-6">
                  ❌
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">이런 내용은 피해주세요</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>욕설이나 비속어</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>개인정보 노출</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>경쟁업체 언급</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>근거 없는 비방</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>광고성 내용</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                <div className="text-4xl mb-4">💝</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">후기 작성 혜택</h3>
                <p className="text-gray-600 mb-6">
                  후기를 작성해주시면 <span className="font-bold text-blue-600">500포인트</span>를 드립니다!<br />
                  사진과 함께 작성하시면 <span className="font-bold text-blue-600">추가 300포인트</span>까지!
                </p>
                <p className="text-sm text-gray-500">
                  * 포인트는 후기 승인 후 24시간 내에 지급되며, 다음 이용시 현금처럼 사용 가능합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 