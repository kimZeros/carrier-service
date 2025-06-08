'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Building2, 
  Phone, 
  MapPin,
  Eye,
  Edit,
  ToggleLeft,
  ToggleRight,
  Download,
  Clock,
  DollarSign,
  Key,
  FileText
} from 'lucide-react';

interface Accommodation {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  region: string;
  deliveryStartTime: string | number[];
  deliveryEndTime: string | number[];
  deliveryFee: number;
  isActive: boolean;
  totalDeliveries: number;
  monthlyDeliveries: number;
  averageRating: number;
  lastDelivery?: string;
  createdAt: string;
}

const mockAccommodations: Accommodation[] = [
  {
    id: '1',
    name: '토쿄 스테이션 호텔',
    address: '도쿄도 치요다구 마루노우치 1-9-1',
    detailAddress: '1층 로비',
    region: '마루노우치',
    deliveryStartTime: '09:00',
    deliveryEndTime: '21:00',
    deliveryFee: 500,
    isActive: true,
    totalDeliveries: 234,
    monthlyDeliveries: 18,
    averageRating: 4.8,
    lastDelivery: '2024-01-15T14:30:00',
    createdAt: '2023-06-15T10:00:00'
  },
  {
    id: '2',
    name: '신주쿠 프린스 호텔',
    address: '도쿄도 신주쿠구 가부키초 1-30-1',
    detailAddress: '컨시어지 데스크',
    region: '신주쿠',
    deliveryStartTime: '08:00',
    deliveryEndTime: '22:00',
    deliveryFee: 600,
    isActive: true,
    totalDeliveries: 189,
    monthlyDeliveries: 22,
    averageRating: 4.6,
    lastDelivery: '2024-01-15T16:20:00',
    createdAt: '2023-05-20T14:30:00'
  },
  {
    id: '3',
    name: '시부야 크로싱 레지던스',
    address: '도쿄도 시부야구 도겐자카 2-15-1',
    detailAddress: '관리사무소',
    region: '시부야',
    deliveryStartTime: '10:00',
    deliveryEndTime: '20:00',
    deliveryFee: 400,
    isActive: false,
    totalDeliveries: 67,
    monthlyDeliveries: 0,
    averageRating: 4.3,
    lastDelivery: '2023-12-28T11:15:00',
    createdAt: '2023-09-10T09:45:00'
  }
];

export default function AccommodationsPage() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>(mockAccommodations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusText = (isActive: boolean) => {
    return isActive ? '활성' : '비활성';
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const filteredAccommodations = accommodations.filter(accommodation => {
    const matchesSearch = accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accommodation.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         accommodation.region.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'active' && accommodation.isActive) ||
                         (statusFilter === 'inactive' && !accommodation.isActive);
    
    const matchesRegion = regionFilter === '' || accommodation.region === regionFilter;
    
    return matchesSearch && matchesStatus && matchesRegion;
  });

  const handleStatusToggle = (accommodationId: string) => {
    setAccommodations(prev => 
      prev.map(a => a.id === accommodationId ? { ...a, isActive: !a.isActive } : a)
    );
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return '-';
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

  const formatTime = (time: string | number[]) => {
    // PostgreSQL에서 배열로 반환되는 경우 처리
    if (Array.isArray(time)) {
      const [hour, minute] = time;
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
    // 문자열로 반환되는 경우 처리 (H2 등)
    if (typeof time === 'string') {
      return time.substring(0, 5); // HH:MM 형식으로 표시
    }
    return '00:00'; // 기본값
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  // 지역 목록 추출
  const regions = Array.from(new Set(accommodations.map(a => a.region)));

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">숙소 관리</h1>
          <p className="text-gray-600 mt-1">배송 가능한 숙소를 관리하세요</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            <span>엑셀 다운로드</span>
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600"
          >
            <Plus className="w-4 h-4" />
            <span>숙소 등록</span>
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">전체 숙소</p>
              <p className="text-2xl font-bold text-gray-900">{accommodations.length}</p>
            </div>
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">활성 숙소</p>
              <p className="text-2xl font-bold text-green-600">
                {accommodations.filter(a => a.isActive).length}
              </p>
            </div>
            <ToggleRight className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">이번달 배송</p>
              <p className="text-2xl font-bold text-coral-600">
                {accommodations.reduce((sum, a) => sum + a.monthlyDeliveries, 0)}
              </p>
            </div>
            <Clock className="w-8 h-8 text-coral-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">평균 평점</p>
              <p className="text-2xl font-bold text-yellow-600">
                {(accommodations.reduce((sum, a) => sum + a.averageRating, 0) / accommodations.length).toFixed(1)}
              </p>
            </div>
            <span className="text-2xl">⭐</span>
          </div>
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">검색</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="숙소명, 주소, 지역으로 검색..."
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
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지역</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coral-500"
            >
              <option value="">전체 지역</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
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

      {/* 숙소 목록 */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  숙소 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  위치 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  배송 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이용 통계
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAccommodations.map((accommodation) => (
                <tr key={accommodation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-coral-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{accommodation.name}</div>
                        <div className="text-xs text-gray-500">등록일: {formatDateTime(accommodation.createdAt)}</div>
                        <div className="flex items-center space-x-1 text-xs text-yellow-500">
                          <span>{renderStars(accommodation.averageRating)}</span>
                          <span>({accommodation.averageRating})</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{accommodation.address}</div>
                    {accommodation.detailAddress && (
                      <div className="text-xs text-gray-500">{accommodation.detailAddress}</div>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-blue-600 mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{accommodation.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatTime(accommodation.deliveryStartTime)} - {formatTime(accommodation.deliveryEndTime)}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <DollarSign className="w-3 h-3" />
                      <span>배송비: {formatPrice(accommodation.deliveryFee)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      이번달: {accommodation.monthlyDeliveries}건
                    </div>
                    <div className="text-xs text-gray-500">
                      총 배송: {accommodation.totalDeliveries}건
                    </div>
                    <div className="text-xs text-gray-500">
                      최근: {formatDateTime(accommodation.lastDelivery)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(accommodation.isActive)}`}>
                      {getStatusText(accommodation.isActive)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAccommodation(accommodation);
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
                      <button
                        onClick={() => handleStatusToggle(accommodation.id)}
                        className={`${accommodation.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                        title={accommodation.isActive ? '비활성화' : '활성화'}
                      >
                        {accommodation.isActive ? <ToggleLeft className="w-4 h-4" /> : <ToggleRight className="w-4 h-4" />}
                      </button>
                      <button className="text-orange-600 hover:text-orange-700" title="접근 정보">
                        <Key className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700" title="메모">
                        <FileText className="w-4 h-4" />
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
          총 <span className="font-medium">{filteredAccommodations.length}</span>개의 숙소
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

      {/* 숙소 상세 모달 */}
      {showDetailModal && selectedAccommodation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">숙소 상세 정보</h2>
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
                    <div><span className="text-gray-500">숙소명:</span> {selectedAccommodation.name}</div>
                    <div><span className="text-gray-500">주소:</span> {selectedAccommodation.address}</div>
                    <div><span className="text-gray-500">상세주소:</span> {selectedAccommodation.detailAddress || '-'}</div>
                    <div><span className="text-gray-500">지역:</span> {selectedAccommodation.region}</div>
                    <div><span className="text-gray-500">평점:</span> {selectedAccommodation.averageRating} ⭐</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">배송 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-500">배송시간:</span> {formatTime(selectedAccommodation.deliveryStartTime)} - {formatTime(selectedAccommodation.deliveryEndTime)}</div>
                    <div><span className="text-gray-500">배송비:</span> {formatPrice(selectedAccommodation.deliveryFee)}</div>
                    <div><span className="text-gray-500">이번달 배송:</span> {selectedAccommodation.monthlyDeliveries}건</div>
                    <div><span className="text-gray-500">총 배송:</span> {selectedAccommodation.totalDeliveries}건</div>
                    <div><span className="text-gray-500">최근 배송:</span> {formatDateTime(selectedAccommodation.lastDelivery)}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => handleStatusToggle(selectedAccommodation.id)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedAccommodation.isActive 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {selectedAccommodation.isActive ? '비활성화' : '활성화'}
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  정보 수정
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  접근 정보 관리
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 