'use client';

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

export default function AccommodationsList() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
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

    fetchAccommodations();
  }, []);

  const formatPrice = (amount: number) => {
    // 큰 숫자는 100으로 나누어서 현실적인 가격으로 표시
    if (amount > 100000) {
      return `₩${Math.floor(amount / 100).toLocaleString()}`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  const formatTime = (time: string | number[]) => {
    // PostgreSQL에서 배열로 반환되는 경우 처리
    if (Array.isArray(time)) {
      const [hour, minute] = time;
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
    // 문자열로 반환되는 경우 처리 (H2 등)
    if (typeof time === 'string') {
      return time.substring(0, 5); // HH:MM 형식으로 변환
    }
    return '00:00'; // 기본값
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🏨 실제 DB 데이터
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              현재 등록된 숙소 목록
            </h2>
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-4 text-gray-600">데이터를 불러오는 중...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ❌ 오류 발생
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              데이터 로드 실패
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
              <p className="text-sm text-gray-600 mt-2">
                백엔드 서버가 실행 중인지 확인해주세요 (http://localhost:8080)
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🏨 실제 DB 데이터
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            현재 등록된 숙소 목록
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            데이터베이스에서 실시간으로 가져온 {accommodations.length}개의 숙소 정보
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map((accommodation) => (
            <div 
              key={accommodation.id} 
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 truncate">
                  {accommodation.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  accommodation.isActive 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  {accommodation.isActive ? '활성' : '비활성'}
                </span>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 text-sm mt-1">📍</span>
                  <div>
                    <p className="text-gray-700 text-sm">{accommodation.address}</p>
                    {accommodation.detailAddress && (
                      <p className="text-gray-500 text-xs">{accommodation.detailAddress}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">🕐</span>
                  <p className="text-gray-700 text-sm">
                    {formatTime(accommodation.deliveryStartTime)} - {formatTime(accommodation.deliveryEndTime)}
                  </p>
                </div>

                <div className="text-sm text-gray-600 flex items-center">
                  <span className="font-medium">배송비:</span>
                  <span className="ml-1 text-purple-600 font-bold">{formatPrice(accommodation.deliveryFee)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">🗺️</span>
                  <p className="text-gray-700 text-sm">
                    {accommodation.latitude.toFixed(4)}, {accommodation.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              {accommodation.notes && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    💬 {accommodation.notes}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  등록일: {new Date(accommodation.createdAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {accommodations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏨</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">등록된 숙소가 없습니다</h3>
            <p className="text-gray-600">
              관리자 페이지에서 숙소를 등록해주세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 