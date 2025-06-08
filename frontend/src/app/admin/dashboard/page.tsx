'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Truck, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  MapPin,
  Phone,
  Calendar
} from 'lucide-react';

interface DashboardStats {
  todayDeliveries: number;
  todayRevenue: number;
  activeDrivers: number;
  pendingReservations: number;
  urgentClaims: number;
  monthlyGrowthRate: number;
  newCustomers: number;
  completionRate: number;
}

interface RecentReservation {
  id: string;
  customerName: string;
  route: string;
  driverName?: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED';
  amount: number;
  pickupTime: string;
}

interface Notification {
  type: 'emergency' | 'success' | 'info' | 'warning';
  title: string;
  message: string;
  createdAt: string;
}

const mockStats: DashboardStats = {
  todayDeliveries: 47,
  todayRevenue: 142800,
  activeDrivers: 12,
  pendingReservations: 8,
  urgentClaims: 2,
  monthlyGrowthRate: 23.5,
  newCustomers: 156,
  completionRate: 94.2
};

const mockRecentReservations: RecentReservation[] = [
  {
    id: '12345',
    customerName: '김철수',
    route: '하네다공항 → 시부야',
    driverName: '이기사',
    status: 'IN_TRANSIT',
    amount: 3000,
    pickupTime: '2024-01-15T14:30:00'
  },
  {
    id: '12346',
    customerName: '박영희',
    route: '신주쿠 → 나리타공항',
    status: 'PENDING',
    amount: 3500,
    pickupTime: '2024-01-15T15:00:00'
  },
  {
    id: '12347',
    customerName: '이지훈',
    route: '시부야 → 하네다공항',
    driverName: '김기사',
    status: 'DELIVERED',
    amount: 2800,
    pickupTime: '2024-01-15T13:45:00'
  }
];

const mockNotifications: Notification[] = [
  {
    type: 'emergency',
    title: '긴급 클레임 발생',
    message: '예약 #12345 - 배송 지연 신고',
    createdAt: '2024-01-15T14:25:00'
  },
  {
    type: 'success',
    title: '배송 완료',
    message: '예약 #12340 - 시부야 → 하네다공항',
    createdAt: '2024-01-15T14:15:00'
  },
  {
    type: 'info',
    title: '새 예약 접수',
    message: '나리타공항 → 신주쿠',
    createdAt: '2024-01-15T14:00:00'
  }
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>(mockRecentReservations);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const formatCurrency = (amount: number) => {
    return `₩${amount.toLocaleString()}`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_TRANSIT': return 'bg-coral-100 text-coral-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '대기중';
      case 'IN_TRANSIT': return '배송중';
      case 'DELIVERED': return '완료';
      default: return status;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'info': return <Package className="w-4 h-4 text-blue-500" />;
      case 'warning': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getNotificationBorderColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'border-l-red-500';
      case 'success': return 'border-l-green-500';
      case 'info': return 'border-l-blue-500';
      case 'warning': return 'border-l-yellow-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-1">오늘의 현황을 한눈에 확인하세요</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('ko-KR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}</span>
        </div>
      </div>

      {/* 주요 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">오늘 배송</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayDeliveries}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from yesterday
              </p>
            </div>
            <Package className="w-8 h-8 text-coral-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">오늘 매출</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.todayRevenue)}</p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8% from yesterday
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">활성 기사</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeDrivers}</p>
              <p className="text-sm text-blue-600">
                {stats.pendingReservations}건 대기중
              </p>
            </div>
            <Truck className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">완료율</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              <p className="text-sm text-gray-500">
                {stats.urgentClaims > 0 ? `긴급 ${stats.urgentClaims}건` : '이상없음'}
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* 성장 지표 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">월간 성장률</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            +{stats.monthlyGrowthRate}%
          </div>
          <p className="text-sm text-gray-600">지난달 대비 예약 증가</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">신규 고객</h3>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {stats.newCustomers}
          </div>
          <p className="text-sm text-gray-600">이번 주 신규 가입</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">평균 배송시간</h3>
            <Clock className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">
            42분
          </div>
          <p className="text-sm text-gray-600">목표: 45분 이내</p>
        </div>
      </div>

      {/* 최근 예약 및 알림 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 예약 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">최근 예약</h3>
          </div>
          <div className="p-0">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900">
                        #{reservation.id}
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {reservation.customerName} - {reservation.route}
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {formatDateTime(reservation.pickupTime)}
                      </span>
                      {reservation.driverName && (
                        <span>
                          <Truck className="w-3 h-3 inline mr-1" />
                          {reservation.driverName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(reservation.amount)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50">
            <button className="w-full text-sm text-coral-600 hover:text-coral-700 font-medium">
              모든 예약 보기 →
            </button>
          </div>
        </div>

        {/* 최근 알림 */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">최근 알림</h3>
          </div>
          <div className="p-0">
            {notifications.map((notification, index) => (
              <div key={index} className={`p-4 border-b border-l-4 last:border-b-0 ${getNotificationBorderColor(notification.type)}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {formatDateTime(notification.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50">
            <button className="w-full text-sm text-coral-600 hover:text-coral-700 font-medium">
              모든 알림 보기 →
            </button>
          </div>
        </div>
      </div>

      {/* 빠른 작업 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">빠른 작업</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-8 h-8 text-coral-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">새 예약</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Truck className="w-8 h-8 text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">기사 관리</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">고객 관리</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <BarChart3 className="w-8 h-8 text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-900">통계 보기</span>
          </button>
        </div>
      </div>
    </div>
  );
} 