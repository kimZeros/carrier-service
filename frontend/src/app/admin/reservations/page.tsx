'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserCheck, 
  MessageSquare, 
  Phone, 
  MapPin,
  Clock,
  Eye,
  Edit,
  Truck,
  Download
} from 'lucide-react';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  route: string;
  fromPlace: string;
  toPlace: string;
  pickupTime: string;
  status: 'PENDING' | 'PAID' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';
  driverName?: string;
  amount: number;
  createdAt: string;
}

const mockReservations: Reservation[] = [
  {
    id: '12345',
    customerName: '김철수',
    customerPhone: '010-1234-5678',
    route: '하네다공항 → 시부야',
    fromPlace: '하네다공항',
    toPlace: '시부야',
    pickupTime: '2024-01-15T14:30:00',
    status: 'IN_TRANSIT',
    driverName: '이기사',
    amount: 3000,
    createdAt: '2024-01-15T10:00:00'
  },
  {
    id: '12346',
    customerName: '박영희',
    customerPhone: '010-2345-6789',
    route: '신주쿠 → 나리타공항',
    fromPlace: '신주쿠',
    toPlace: '나리타공항',
    pickupTime: '2024-01-15T15:00:00',
    status: 'PENDING',
    amount: 3500,
    createdAt: '2024-01-15T11:30:00'
  },
  {
    id: '12347',
    customerName: '이지훈',
    customerPhone: '010-3456-7890',
    route: '시부야 → 하네다공항',
    fromPlace: '시부야',
    toPlace: '하네다공항',
    pickupTime: '2024-01-15T13:45:00',
    status: 'DELIVERED',
    driverName: '김기사',
    amount: 2800,
    createdAt: '2024-01-15T09:15:00'
  }
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return '대기중';
      case 'PAID': return '결제완료';
      case 'IN_TRANSIT': return '배송중';
      case 'DELIVERED': return '배송완료';
      case 'CANCELLED': return '취소됨';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'PAID': return 'bg-blue-100 text-blue-800';
      case 'IN_TRANSIT': return 'bg-coral-100 text-coral-800';
      case 'DELIVERED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.id.includes(searchTerm) ||
                         reservation.route.includes(searchTerm);
    const matchesStatus = statusFilter === '' || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (reservationId: string, newStatus: string) => {
    setReservations(prev => 
      prev.map(r => r.id === reservationId ? { ...r, status: newStatus as any } : r)
    );
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

  const formatPrice = (amount: number) => {
    if (amount > 100000) {
      return `₩${Math.floor(amount / 100).toLocaleString()}`;
    }
    return `₩${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">예약/배송 관리</h1>
          <p className="text-gray-600 mt-1">예약 현황을 확인하고 관리하세요</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>엑셀 다운로드</span>
          </button>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="예약ID, 고객명, 경로로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            >
              <option value="">전체</option>
              <option value="PENDING">대기중</option>
              <option value="PAID">결제완료</option>
              <option value="IN_TRANSIT">배송중</option>
              <option value="DELIVERED">배송완료</option>
              <option value="CANCELLED">취소됨</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600">
              <Filter className="w-4 h-4" />
              <span>필터 적용</span>
            </button>
          </div>
        </div>
      </div>

      {/* 예약 목록 */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  예약 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  고객 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  배송 경로
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  기사/상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  금액/시간
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-coral-600">#{reservation.id}</div>
                      <div className="text-xs text-gray-500">{formatDateTime(reservation.createdAt)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                      <div className="text-xs text-gray-500">{reservation.customerPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div className="text-sm text-gray-900">
                        <div>{reservation.fromPlace}</div>
                        <div className="text-xs text-gray-500">↓</div>
                        <div>{reservation.toPlace}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">
                        {reservation.driverName ? (
                          <span className="flex items-center space-x-1">
                            <Truck className="w-4 h-4 text-green-500" />
                            <span>{reservation.driverName}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400">미배정</span>
                        )}
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                        {getStatusText(reservation.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{formatPrice(reservation.amount)}</div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatDateTime(reservation.pickupTime)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedReservation(reservation);
                          setShowDetailModal(true);
                        }}
                        className="text-coral-600 hover:text-coral-700"
                        title="상세보기"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-700" title="수정">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700" title="기사배정">
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700" title="고객연락">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-700" title="메모">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          총 <span className="font-medium">{filteredReservations.length}</span>개의 예약
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            이전
          </button>
          <button className="px-3 py-2 text-sm bg-coral-500 text-white rounded-lg">
            1
          </button>
          <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            다음
          </button>
        </div>
      </div>

      {/* 상세보기 모달 */}
      {showDetailModal && selectedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">예약 상세 정보</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">기본 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">예약ID:</span> #{selectedReservation.id}</div>
                    <div><span className="text-gray-500">고객명:</span> {selectedReservation.customerName}</div>
                    <div><span className="text-gray-500">연락처:</span> {selectedReservation.customerPhone}</div>
                    <div><span className="text-gray-500">금액:</span> {formatPrice(selectedReservation.amount)}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">배송 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">출발지:</span> {selectedReservation.fromPlace}</div>
                    <div><span className="text-gray-500">목적지:</span> {selectedReservation.toPlace}</div>
                    <div><span className="text-gray-500">픽업시간:</span> {formatDateTime(selectedReservation.pickupTime)}</div>
                    <div><span className="text-gray-500">배정기사:</span> {selectedReservation.driverName || '미배정'}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <select 
                  value={selectedReservation.status}
                  onChange={(e) => handleStatusUpdate(selectedReservation.id, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
                >
                  <option value="PENDING">대기중</option>
                  <option value="PAID">결제완료</option>
                  <option value="IN_TRANSIT">배송중</option>
                  <option value="DELIVERED">배송완료</option>
                  <option value="CANCELLED">취소됨</option>
                </select>
                <button className="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600">
                  상태 변경
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 