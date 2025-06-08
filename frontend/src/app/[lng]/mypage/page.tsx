'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function MyPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const userData = {
    name: '김한국',
    email: 'kim@example.com',
    phone: '010-1234-5678',
    membership: 'Premium',
    points: 15600,
    totalDeliveries: 12,
    savings: 145000
  };

  const recentDeliveries = [
    {
      id: 'CD20241115001',
      date: '2024.11.15',
      route: '간사이공항 → 오사카 센트럴 호텔',
      status: '완료',
      amount: 45000,
      rating: 5
    },
    {
      id: 'CD20241110002',
      date: '2024.11.10', 
      route: '교토 료칸 → 나리타공항',
      status: '완료',
      amount: 52000,
      rating: 4
    },
    {
      id: 'CD20241105003',
      date: '2024.11.05',
      route: '하네다공항 → 도쿄 프린스 호텔',
      status: '배송중',
      amount: 38000,
      rating: null
    }
  ];

  const menuItems = [
    { id: 'overview', label: '대시보드', icon: '📊' },
    { id: 'deliveries', label: '배송 이력', icon: '📦' },
    { id: 'points', label: '포인트', icon: '🎁' },
    { id: 'membership', label: '멤버십', icon: '👑' },
    { id: 'profile', label: '프로필', icon: '👤' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-6">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-2xl font-bold">{userData.totalDeliveries}</div>
                <div className="text-sm opacity-90">총 배송 횟수</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-6">
                <div className="text-3xl mb-2">🎁</div>
                <div className="text-2xl font-bold">{userData.points.toLocaleString()}</div>
                <div className="text-sm opacity-90">보유 포인트</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl p-6">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold">₩{userData.savings.toLocaleString()}</div>
                <div className="text-sm opacity-90">멤버십 절약금액</div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl p-6">
                <div className="text-3xl mb-2">👑</div>
                <div className="text-2xl font-bold">{userData.membership}</div>
                <div className="text-sm opacity-90">현재 멤버십</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6">최근 배송 내역</h3>
              <div className="space-y-4">
                {recentDeliveries.slice(0, 3).map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{delivery.route}</div>
                      <div className="text-sm text-gray-500">{delivery.date} • {delivery.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">₩{delivery.amount.toLocaleString()}</div>
                      <div className={`text-sm ${delivery.status === '완료' ? 'text-green-600' : 'text-blue-600'}`}>
                        {delivery.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link href={`/${lng}/request-delivery`} className="bg-purple-500 text-white rounded-2xl p-6 hover:bg-purple-600 transition-all">
                <div className="text-3xl mb-3">🚚</div>
                <div className="text-xl font-bold mb-2">새 배송 신청</div>
                <div className="text-sm opacity-90">빠르고 안전한 배송 서비스</div>
              </Link>
              <Link href={`/${lng}/reviews/write`} className="bg-blue-500 text-white rounded-2xl p-6 hover:bg-blue-600 transition-all">
                <div className="text-3xl mb-3">✍️</div>
                <div className="text-xl font-bold mb-2">후기 작성</div>
                <div className="text-sm opacity-90">500 포인트 적립</div>
              </Link>
            </div>
          </div>
        );

      case 'deliveries':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6">전체 배송 이력</h3>
            <div className="space-y-4">
              {recentDeliveries.map((delivery) => (
                <div key={delivery.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-bold text-lg">{delivery.route}</div>
                      <div className="text-sm text-gray-500">{delivery.date} • {delivery.id}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      delivery.status === '완료' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {delivery.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-lg">₩{delivery.amount.toLocaleString()}</div>
                    {delivery.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < delivery.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'points':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">포인트 현황</h3>
              <div className="text-4xl font-bold mb-2">{userData.points.toLocaleString()} P</div>
              <div className="text-sm opacity-90">₩{userData.points.toLocaleString()} 상당</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6">포인트 적립 내역</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <div className="font-medium">배송 완료</div>
                    <div className="text-sm text-gray-500">2024.11.15</div>
                  </div>
                  <div className="text-green-600 font-bold">+450P</div>
                </div>
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <div className="font-medium">후기 작성</div>
                    <div className="text-sm text-gray-500">2024.11.12</div>
                  </div>
                  <div className="text-green-600 font-bold">+500P</div>
                </div>
                <div className="flex justify-between items-center p-3 border-b">
                  <div>
                    <div className="font-medium">멤버십 가입</div>
                    <div className="text-sm text-gray-500">2024.11.01</div>
                  </div>
                  <div className="text-green-600 font-bold">+1000P</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'membership':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">👑</span>
                <h3 className="text-2xl font-bold">Premium 멤버십</h3>
              </div>
              <div className="text-lg mb-2">20% 할인 혜택</div>
              <div className="text-sm opacity-90">다음 갱신일: 2024.12.15</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6">멤버십 혜택</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">📦</div>
                  <div className="font-bold">무료 보관 서비스</div>
                  <div className="text-sm text-gray-600">최대 7일간 무료</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-bold">우선 픽업</div>
                  <div className="text-sm text-gray-600">30분 내 픽업 보장</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">👨‍💼</div>
                  <div className="font-bold">전담 매니저</div>
                  <div className="text-sm text-gray-600">24시간 전용 상담</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">🎁</div>
                  <div className="font-bold">포인트 2배 적립</div>
                  <div className="text-sm text-gray-600">일반 회원 대비 2배</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6">프로필 정보</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                <input type="text" value={userData.name} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                <input type="email" value={userData.email} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                <input type="tel" value={userData.phone} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div className="flex gap-4">
                <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-all">
                  저장
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all">
                  취소
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              안녕하세요, {userData.name}님! 👋
            </h1>
            <p className="text-lg opacity-90">
              CarryDrop과 함께한 {userData.totalDeliveries}번의 여행, 감사합니다
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Sidebar Menu */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <nav className="space-y-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === item.id
                            ? 'bg-purple-500 text-white'
                            : 'text-gray-600 hover:bg-purple-50'
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 