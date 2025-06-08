'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  serviceType: 'AIRPORT_TO_HOTEL' | 'HOTEL_TO_HOTEL' | 'HOTEL_TO_AIRPORT' | 'STORAGE';
  route?: string;
  date: string;
  helpful: number;
  photos?: string[];
  verified: boolean;
}

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function ReviewsPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState('ALL');

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  // 실제로는 API에서 가져올 데이터
  const reviews: Review[] = [
    {
      id: '1',
      userName: '김지우',
      userAvatar: '👩‍💼',
      rating: 5,
      title: '정말 편리했어요! 공항에서 호텔까지 짐 배송',
      content: '나리타 공항에서 시부야 호텔까지 캐리어 2개를 배송했는데, 정말 편했습니다. 공항에서 짐을 맡기고 바로 도쿄 시내 관광을 시작할 수 있어서 시간을 훨씬 효율적으로 쓸 수 있었어요. 호텔 도착했을 때 이미 짐이 대기하고 있더라구요!',
      serviceType: 'AIRPORT_TO_HOTEL',
      route: '나리타공항 → 시부야 호텔',
      date: '2024-01-15',
      helpful: 24,
      photos: [],
      verified: true
    },
    {
      id: '2',
      userName: '박민준',
      userAvatar: '👨‍💻',
      rating: 5,
      title: '호텔 간 이동시 너무 유용해요',
      content: '도쿄에서 오사카로 이동할 때 이용했습니다. 체크아웃 후 캐리어를 맡기고 하루 더 도쿄 관광을 즐긴 후 오사카 호텔로 가니 짐이 이미 도착해있었어요. 신칸센에서 무거운 짐 끌고 다니지 않아도 되니까 정말 편했습니다.',
      serviceType: 'HOTEL_TO_HOTEL',
      route: '도쿄 호텔 → 오사카 호텔',
      date: '2024-01-12',
      helpful: 18,
      photos: [],
      verified: true
    },
    {
      id: '3',
      userName: '이서연',
      userAvatar: '👩‍🎓',
      rating: 4,
      title: '마지막 날 쇼핑에 집중할 수 있었어요',
      content: '체크아웃 후 짐을 공항으로 미리 보내고 하루 종일 쇼핑했어요. 하네다 공항에서 짐 찾는 것도 간단했고, 마지막 날을 알차게 보낼 수 있어서 좋았습니다. 다만 배송 시간이 생각보다 조금 걸렸어요.',
      serviceType: 'HOTEL_TO_AIRPORT',
      route: '신주쿠 호텔 → 하네다공항',
      date: '2024-01-10',
      helpful: 15,
      photos: [],
      verified: true
    },
    {
      id: '4',
      userName: '최준호',
      userAvatar: '👨‍🎨',
      rating: 5,
      title: '여행 내내 짐걱정 없이!',
      content: '일주일 일본 여행하면서 CarryDrop 서비스를 3번 이용했는데, 매번 만족스러웠어요. 특히 교토에서 료칸 이용할 때도 문제없이 배송되어서 놀랐습니다. 직원분들도 친절하고 짐도 안전하게 보관해주셔서 믿을 수 있었어요.',
      serviceType: 'HOTEL_TO_HOTEL',
      route: '교토 료칸 → 오사카 호텔',
      date: '2024-01-08',
      helpful: 32,
      photos: [],
      verified: true
    },
    {
      id: '5',
      userName: '한예린',
      userAvatar: '👩‍🍳',
      rating: 5,
      title: '겨울 일본여행의 필수템!',
      content: '겨울 옷들로 캐리어가 정말 무거웠는데, CarryDrop 덕분에 편하게 다닐 수 있었어요. 특히 눈 올 때 계단 많은 일본에서 무거운 짐 끌고 다니기 정말 힘든데, 이 서비스가 있어서 구원받았습니다. 강력 추천해요!',
      serviceType: 'AIRPORT_TO_HOTEL',
      route: '간사이공항 → 교토 호텔',
      date: '2024-01-05',
      helpful: 28,
      photos: [],
      verified: true
    },
    {
      id: '6',
      userName: '정승우',
      userAvatar: '👨‍⚕️',
      rating: 4,
      title: '가족여행에 정말 유용했어요',
      content: '가족 4명이 일본 여행 갔는데 짐이 정말 많았어요. 아이들 물건도 많고... CarryDrop으로 미리 호텔에 보내니까 공항에서 아이들 손잡고 편하게 이동할 수 있었습니다. 다음에도 꼭 이용할 예정이에요.',
      serviceType: 'AIRPORT_TO_HOTEL',
      route: '나리타공항 → 디즈니랜드 호텔',
      date: '2024-01-03',
      helpful: 21,
      photos: [],
      verified: true
    },
    {
      id: '7',
      userName: '송미영',
      userAvatar: '👩‍💼',
      rating: 5,
      title: '비즈니스 출장에도 완벽!',
      content: '도쿄 출장 중에 주말에 개인 여행도 겸해서 이용했어요. 호텔에서 회사 서류가 든 가방은 따로 보관하고, 개인 짐만 관광지 근처 호텔로 배송했는데 정말 체계적이었습니다. 프로페셔널한 서비스라고 느꼈어요.',
      serviceType: 'STORAGE',
      route: '임시보관 → 시부야 호텔',
      date: '2024-01-01',
      helpful: 19,
      photos: [],
      verified: true
    },
    {
      id: '8',
      userName: '윤태현',
      userAvatar: '👨‍🎤',
      rating: 4,
      title: '온천여행에서 대활약!',
      content: '하코네 온천 여행 갔는데, 큰 캐리어 끌고 료칸 가기가 부담스러웠어요. CarryDrop으로 미리 보내놓으니까 전철 갈아타기도 편하고, 온천 료칸의 좁은 복도에서도 불편함이 없었습니다. 온천여행 계획 중이시라면 추천!',
      serviceType: 'HOTEL_TO_HOTEL',
      route: '도쿄 호텔 → 하코네 료칸',
      date: '2023-12-28',
      helpful: 26,
      photos: [],
      verified: true
    }
  ];

  const filterOptions = [
    { value: 'ALL', label: '전체' },
    { value: 'AIRPORT_TO_HOTEL', label: '공항→호텔' },
    { value: 'HOTEL_TO_HOTEL', label: '호텔→호텔' },
    { value: 'HOTEL_TO_AIRPORT', label: '호텔→공항' },
    { value: 'STORAGE', label: '보관서비스' }
  ];

  const ratingOptions = [
    { value: 'ALL', label: '전체 평점' },
    { value: '5', label: '⭐⭐⭐⭐⭐ (5점)' },
    { value: '4', label: '⭐⭐⭐⭐ (4점 이상)' },
    { value: '3', label: '⭐⭐⭐ (3점 이상)' }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = selectedFilter === 'ALL' || review.serviceType === selectedFilter;
    const matchesRating = selectedRating === 'ALL' || 
      (selectedRating === '5' && review.rating === 5) ||
      (selectedRating === '4' && review.rating >= 4) ||
      (selectedRating === '3' && review.rating >= 3);
    
    return matchesFilter && matchesRating;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;
  const verifiedReviews = reviews.filter(review => review.verified).length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ⭐
      </span>
    ));
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'AIRPORT_TO_HOTEL': return '공항→호텔';
      case 'HOTEL_TO_HOTEL': return '호텔→호텔';
      case 'HOTEL_TO_AIRPORT': return '호텔→공항';
      case 'STORAGE': return '보관서비스';
      default: return type;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">💬</span>
              <span className="font-medium">CarryDrop 이용후기</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              실제 이용고객 후기
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              CarryDrop을 이용한 고객들의 생생한 후기를<br />
              확인하고 안심하고 서비스를 이용하세요
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating))}</div>
              <div className="text-gray-600">평균 평점</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">{totalReviews.toLocaleString()}</div>
              <div className="text-gray-600">총 후기 수</div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{verifiedReviews}</div>
              <div className="text-gray-600">인증된 후기</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <span className="font-semibold text-gray-700 flex items-center">서비스 타입:</span>
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedFilter(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFilter === option.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <span className="font-semibold text-gray-700">평점:</span>
              {ratingOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedRating(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRating === option.value
                      ? 'bg-purple-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              고객 후기 ({filteredReviews.length}개)
            </h2>
            <p className="text-gray-600">실제 CarryDrop을 이용한 고객들의 솔직한 후기입니다</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {filteredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all">
                <div className="p-8">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-2xl">
                        {review.userAvatar}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          {review.userName}
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              ✓ 인증됨
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {getServiceTypeLabel(review.serviceType)}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-6">
                    <h4 className="font-bold text-lg text-gray-800 mb-3">
                      {review.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {review.content}
                    </p>
                    {review.route && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <span className="text-sm text-gray-500">이용 경로:</span>
                        <p className="font-medium text-gray-700">{review.route}</p>
                      </div>
                    )}
                  </div>

                  {/* Review Footer */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors">
                      <span>👍</span>
                      <span className="text-sm">도움돼요 ({review.helpful})</span>
                    </button>
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <span>📤</span>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <span>🔗</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            CarryDrop을 이용해보셨나요?
          </h2>
          <p className="text-xl mb-8 opacity-95">
            여러분의 소중한 후기를 공유하고 다른 여행객들에게 도움을 주세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`/${lng}/request-delivery`}
              className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-block"
            >
              서비스 이용하기
            </Link>
            <Link 
              href={`/${lng}/reviews/write`}
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all inline-block"
            >
              후기 작성하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 