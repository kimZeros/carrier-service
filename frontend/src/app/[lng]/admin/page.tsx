'use client';

import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  pickupLocation: string;
  deliveryLocation: string;
  status: 'PENDING' | 'CONFIRMED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  orderDate: string;
  deliveryDate?: string;
  amount: number;
  paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
  driver?: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipLevel: 'BASIC' | 'PREMIUM' | 'VIP';
  totalOrders: number;
  totalSpent: number;
  joinDate: string;
  lastLogin: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

interface Notification {
  id: string;
  type: 'ORDER' | 'PAYMENT' | 'SYSTEM' | 'USER';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
}

export default function AdminPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  // Enhanced Mock Data
  const dashboardStats = {
    todayOrders: 147,
    todayRevenue: 5280000,
    activeDeliveries: 23,
    totalUsers: 12847,
    monthlyGrowth: 15.4,
    customerSatisfaction: 4.8,
    averageDeliveryTime: 4.2,
    conversionRate: 68.5,
    pendingOrders: 8,
    completedToday: 134,
    cancelledToday: 5,
    totalDrivers: 45,
    activeDrivers: 28,
    monthlyRevenue: 127500000
  };

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'ORDER',
      title: '긴급 배송 요청',
      message: '나리타공항에서 긴급 배송 요청이 들어왔습니다.',
      time: '5분 전',
      read: false,
      priority: 'HIGH'
    },
    {
      id: '2',
      type: 'PAYMENT',
      title: '결제 오류',
      message: '주문 CD240015의 결제 처리 중 오류가 발생했습니다.',
      time: '12분 전',
      read: false,
      priority: 'HIGH'
    },
    {
      id: '3',
      type: 'SYSTEM',
      title: '시스템 업데이트',
      message: '오늘 밤 2시-4시 시스템 점검이 예정되어 있습니다.',
      time: '1시간 전',
      read: true,
      priority: 'NORMAL'
    }
  ];

  const recentOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'CD240001',
      customerName: '김지우',
      customerPhone: '010-1234-5678',
      serviceType: '공항→호텔',
      pickupLocation: '나리타공항',
      deliveryLocation: '시부야 호텔',
      status: 'IN_TRANSIT',
      orderDate: '2024-01-16T10:30:00',
      amount: 45000,
      paymentStatus: 'PAID',
      driver: '이기사',
      priority: 'NORMAL'
    },
    {
      id: '2',
      orderNumber: 'CD240002',
      customerName: '박민준',
      customerPhone: '010-2345-6789',
      serviceType: '호텔→호텔',
      pickupLocation: '도쿄 호텔',
      deliveryLocation: '오사카 호텔',
      status: 'PICKED_UP',
      orderDate: '2024-01-16T09:15:00',
      amount: 35000,
      paymentStatus: 'PAID',
      driver: '김기사',
      priority: 'HIGH'
    },
    {
      id: '3',
      orderNumber: 'CD240003',
      customerName: '이서연',
      customerPhone: '010-3456-7890',
      serviceType: '호텔→공항',
      pickupLocation: '신주쿠 호텔',
      deliveryLocation: '하네다공항',
      status: 'CONFIRMED',
      orderDate: '2024-01-16T08:45:00',
      amount: 55000,
      paymentStatus: 'PAID',
      driver: '박기사',
      priority: 'URGENT'
    }
  ];

  const recentUsers: User[] = [
    {
      id: '1',
      name: '김지우',
      email: 'jiwoo@email.com',
      phone: '010-1234-5678',
      membershipLevel: 'PREMIUM',
      totalOrders: 8,
      totalSpent: 320000,
      joinDate: '2023-12-15',
      lastLogin: '2024-01-16 10:30',
      status: 'ACTIVE'
    },
    {
      id: '2',
      name: '박민준',
      email: 'minjun@email.com',
      phone: '010-2345-6789',
      membershipLevel: 'VIP',
      totalOrders: 15,
      totalSpent: 675000,
      joinDate: '2023-11-20',
      lastLogin: '2024-01-16 10:30',
      status: 'ACTIVE'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-blue-100 text-blue-800';
      case 'PICKED_UP': return 'bg-purple-100 text-purple-800';
      case 'IN_TRANSIT': return 'bg-orange-100 text-orange-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      case 'PAID': return 'bg-green-100 text-green-800';
      case 'REFUNDED': return 'bg-red-100 text-red-800';
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return 'bg-gray-100 text-gray-800';
      case 'NORMAL': return 'bg-blue-100 text-blue-800';
      case 'HIGH': return 'bg-orange-100 text-orange-800';
      case 'URGENT': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMembershipBadge = (level: string) => {
    switch (level) {
      case 'BASIC': return 'bg-gray-100 text-gray-800';
      case 'PREMIUM': return 'bg-purple-100 text-purple-800';
      case 'VIP': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabItems = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'orders', label: '주문 관리', icon: '📦', badge: dashboardStats.pendingOrders },
    { id: 'users', label: '사용자 관리', icon: '👥' },
    { id: 'drivers', label: '기사 관리', icon: '🚚' },
    { id: 'accommodations', label: '숙소 관리', icon: '🏨' },
    { id: 'analytics', label: '통계 분석', icon: '📈' },
    { id: 'finance', label: '정산 관리', icon: '💰' },
    { id: 'settings', label: '시스템 설정', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Logo & Nav */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  C
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">CarryDrop</h1>
                  <p className="text-xs text-gray-500">관리자 콘솔</p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="hidden lg:flex items-center gap-3">
                <button className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all">
                  <span>📦</span>
                  <span className="text-sm font-medium">신규 주문</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all">
                  <span>🚚</span>
                  <span className="text-sm font-medium">기사 배정</span>
                </button>
              </div>
            </div>

            {/* Right Side - Tools & Profile */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="주문번호, 고객명 검색..."
                    className="w-64 px-4 py-2 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all"
                >
                  <span className="text-xl">🔔</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-bold text-gray-800">알림</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                  {notification.type}
                                </span>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </div>
                              <h4 className="font-medium text-gray-800 mb-1">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-500">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200">
                      <button className="w-full text-center text-sm text-purple-600 hover:text-purple-800">
                        모든 알림 보기
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    A
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-800">관리자</div>
                    <div className="text-xs text-gray-500">admin@carrydrop.co.kr</div>
                  </div>
                  <span className="text-gray-400">⌄</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                        👤 프로필 설정
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                        🔐 보안 설정
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded">
                        📊 활동 로그
                      </button>
                      <hr className="my-2" />
                      <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                        🚪 로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Enhanced Sidebar */}
        <div className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              {tabItems.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.id ? 'bg-white text-purple-500' : 'bg-red-500 text-white'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* System Status */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-green-800">시스템 정상</span>
              </div>
              <div className="text-xs text-green-600">
                서버 상태: 양호<br />
                응답 시간: 45ms<br />
                가동률: 99.9%
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">📦</div>
                    <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">오늘</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{dashboardStats.todayOrders}</div>
                  <div className="text-gray-600 mb-2">신규 주문</div>
                  <div className="text-sm text-green-600">+12% 어제 대비</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">💰</div>
                    <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">매출</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">₩{dashboardStats.todayRevenue.toLocaleString()}</div>
                  <div className="text-gray-600 mb-2">오늘 매출</div>
                  <div className="text-sm text-green-600">+8.5% 어제 대비</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">🚚</div>
                    <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">실시간</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{dashboardStats.activeDeliveries}</div>
                  <div className="text-gray-600 mb-2">진행중 배송</div>
                  <div className="text-sm text-blue-600">{dashboardStats.activeDrivers}명 기사 활동</div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">⭐</div>
                    <div className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-sm">만족도</div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{dashboardStats.customerSatisfaction}/5</div>
                  <div className="text-gray-600 mb-2">고객 만족도</div>
                  <div className="text-sm text-green-600">+0.2 지난달 대비</div>
                </div>
              </div>

              {/* Live Activity */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-800">실시간 주문 현황</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-sm text-gray-600">실시간 업데이트</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentOrders.slice(0, 5).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(order.priority)}`}>
                              {order.priority}
                            </div>
                            <div>
                              <div className="font-bold text-gray-800">{order.orderNumber}</div>
                              <div className="text-sm text-gray-600">{order.customerName} | {order.serviceType}</div>
                              <div className="text-xs text-gray-500">{order.pickupLocation} → {order.deliveryLocation}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </div>
                            <div className="text-sm font-bold text-gray-800 mt-1">₩{order.amount.toLocaleString()}</div>
                            {order.driver && (
                              <div className="text-xs text-gray-500">기사: {order.driver}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">오늘 요약</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">완료된 배송</span>
                        <span className="font-bold text-green-600">{dashboardStats.completedToday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">대기중 주문</span>
                        <span className="font-bold text-yellow-600">{dashboardStats.pendingOrders}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">취소된 주문</span>
                        <span className="font-bold text-red-600">{dashboardStats.cancelledToday}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">활동 기사</span>
                        <span className="font-bold text-blue-600">{dashboardStats.activeDrivers}/{dashboardStats.totalDrivers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Urgent Actions */}
                  <div className="bg-white rounded-xl shadow-sm border p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">긴급 처리 필요</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-sm font-medium text-red-800">결제 오류 3건</div>
                        <div className="text-xs text-red-600">즉시 확인 필요</div>
                      </div>
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="text-sm font-medium text-orange-800">지연 배송 2건</div>
                        <div className="text-xs text-orange-600">고객 연락 필요</div>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="text-sm font-medium text-yellow-800">기사 배정 대기 5건</div>
                        <div className="text-xs text-yellow-600">배정 요청</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content remain similar but can be enhanced */}
          {activeTab !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-sm border p-8">
              <div className="text-center text-gray-500 py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{tabItems.find(t => t.id === activeTab)?.label}</h3>
                <p>이 기능은 곧 업데이트될 예정입니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 