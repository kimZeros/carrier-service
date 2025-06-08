'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function FAQPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    { name: '전체', icon: '📋', count: 0 },
    { name: '서비스 이용', icon: '🚚', count: 0 },
    { name: '요금·결제', icon: '💳', count: 0 },
    { name: '배송·픽업', icon: '📦', count: 0 },
    { name: '회원·멤버십', icon: '👤', count: 0 },
    { name: '숙소·공항', icon: '🏨', count: 0 },
    { name: '기타', icon: '❓', count: 0 }
  ];

  const faqData = [
    {
      category: '서비스 이용',
      question: 'CarryDrop 서비스는 어떻게 이용하나요?',
      answer: '온라인으로 간단하게 예약할 수 있습니다. ①배송 신청 페이지에서 출발지/도착지 입력 ②짐 정보 및 배송 희망 시간 선택 ③결제 완료 후 예약 확정 ④지정된 시간에 픽업 ⑤실시간 배송 추적 ⑥안전한 배송 완료. 전 과정이 앱이나 웹사이트에서 확인 가능합니다.',
      popular: true
    },
    {
      category: '서비스 이용',
      question: '예약은 언제까지 가능한가요?',
      answer: '배송 희망일 최소 3시간 전까지 예약 가능합니다. 당일 예약도 가능하지만 추가 요금(30%)이 발생할 수 있으며, 픽업 가능 여부는 실시간 확인이 필요합니다. 성수기나 연휴에는 최소 24시간 전 예약을 권장합니다.',
      popular: true
    },
    {
      category: '요금·결제',
      question: '배송비는 얼마인가요?',
      answer: '기본 배송비는 거리와 서비스 타입에 따라 달라집니다. 공항→숙소: ₩35,000~₩65,000, 숙소→숙소: ₩25,000~₩45,000, 숙소→공항: ₩45,000~₩75,000. 멤버십 회원은 최대 30% 할인 혜택이 있습니다. 정확한 요금은 예약 시 실시간으로 확인됩니다.',
      popular: true
    },
    {
      category: '요금·결제',
      question: '어떤 결제 방법을 지원하나요?',
      answer: '신용카드(VISA, MasterCard, JCB), 체크카드, 간편결제(카카오페이, 네이버페이, 페이코), 계좌이체를 지원합니다. 해외 발급 카드도 사용 가능하며, 결제는 한국원화(₩)로 진행됩니다.',
      popular: false
    },
    {
      category: '요금·결제',
      question: '취소 시 환불은 어떻게 되나요?',
      answer: '픽업 2시간 전: 100% 환불, 픽업 2시간 이내: 50% 환불, 픽업 후 취소: 환불 불가. 배송 중 문제 발생시에는 전액 환불됩니다. 환불은 결제 수단으로 3-5영업일 내에 처리됩니다.',
      popular: false
    },
    {
      category: '배송·픽업',
      question: '짐을 분실하거나 파손되면 어떻게 하나요?',
      answer: '모든 짐에 대해 최대 100만원까지 보상보험이 자동 적용됩니다. 분실이나 파손 발견 즉시 고객센터(1588-1234)로 연락주시면 24시간 내에 보상 절차를 시작합니다. 귀중품은 별도 포장을 권장드립니다.',
      popular: true
    },
    {
      category: '배송·픽업',
      question: '배송이 지연되면 어떻게 하나요?',
      answer: '교통 상황으로 인한 30분 이내 지연은 무료이며, 30분 이상 지연시 배송비 20% 할인을 적용합니다. 기상 악화 등 불가피한 사유로 당일 배송이 불가능한 경우 전액 환불하거나 일정 변경이 가능합니다.',
      popular: false
    },
    {
      category: '배송·픽업',
      question: '대형 짐이나 특수 물품도 배송 가능한가요?',
      answer: '골프백, 스키장비, 서핑보드, 자전거 등 대형 스포츠 용품 배송 가능합니다. 가로×세로×높이 합계 200cm 이하, 무게 30kg 이하까지 가능하며, 위험물질(인화성, 폭발성)은 배송 불가입니다. 사전에 크기와 무게를 정확히 알려주세요.',
      popular: false
    },
    {
      category: '회원·멤버십',
      question: '멤버십 혜택은 무엇인가요?',
      answer: 'Basic(₩2,980/월): 10% 할인 + 우선 예약, Premium(₩3,980/월): 20% 할인 + 무료 보관 서비스, VIP(₩4,980/월): 30% 할인 + 전담 매니저 + 긴급 서비스. 월 2회 이상 이용하면 멤버십이 더 경제적입니다.',
      popular: true
    },
    {
      category: '회원·멤버십',
      question: '포인트는 어떻게 적립되나요?',
      answer: '이용 금액의 1% 자동 적립됩니다. 멤버십 회원은 2% 적립되며, 리뷰 작성시 추가 500포인트, 친구 추천시 1,000포인트를 드립니다. 적립된 포인트는 다음 이용시 현금처럼 사용 가능합니다.',
      popular: false
    },
    {
      category: '숙소·공항',
      question: '모든 숙소에서 이용 가능한가요?',
      answer: '현재 전국 1,200여개 제휴 숙소에서 이용 가능합니다. 제휴 숙소가 아닌 경우에도 주변 픽업 장소(편의점, 역사 등)에서 서비스 가능하며, 이 경우 추가 요금이 발생할 수 있습니다. 숙소 제휴 문의는 별도 상담 가능합니다.',
      popular: false
    },
    {
      category: '숙소·공항',
      question: '공항에서는 어디서 픽업하나요?',
      answer: '각 공항의 도착 게이트 근처 지정된 픽업 포인트에서 만나게 됩니다. 간사이공항: 1터미널 1층 A구역, 나리타공항: 1터미널 1층 남쪽 출구, 하네다공항: 국제선터미널 2층 도착 로비. 정확한 위치는 예약 확정 후 SMS로 안내됩니다.',
      popular: true
    },
    {
      category: '기타',
      question: '24시간 고객센터가 있나요?',
      answer: '365일 24시간 고객센터(1588-1234)를 운영합니다. 한국어, 일본어, 영어 지원 가능하며, 카카오톡 채널(@carrydrop), 이메일(help@carrydrop.co.kr)로도 문의 가능합니다. 긴급 상황시에는 전화 연결이 가장 빠릅니다.',
      popular: false
    },
    {
      category: '기타',
      question: '서비스 이용 중 문제가 생기면?',
      answer: '실시간 채팅, 전화, 이메일로 즉시 지원받을 수 있습니다. 배송 중 실시간 추적으로 상황 모니터링이 가능하며, 문제 발생시 즉시 대체 방안을 제시합니다. 모든 문의는 30분 이내 1차 응답을 원칙으로 합니다.',
      popular: false
    }
  ];

  // 카테고리별 개수 업데이트
  faqCategories.forEach(category => {
    if (category.name === '전체') {
      category.count = faqData.length;
    } else {
      category.count = faqData.filter(faq => faq.category === category.name).length;
    }
  });

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === '전체' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqData.filter(faq => faq.popular);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">❓</span>
              <span className="font-medium">자주 묻는 질문</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              궁금한 점이 있으시나요?<br />바로 해결해드릴게요
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              CarryDrop 이용에 대한 모든 궁금증을<br />빠르게 해결하세요
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="궁금한 내용을 검색해보세요..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-4 px-6 pr-12 rounded-2xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                  🔍
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              인기 질문
            </h2>
            <p className="text-lg text-gray-600">
              가장 많이 묻는 질문들을 먼저 확인해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {popularFAQs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-100 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                    Q
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer.substring(0, 120)}...</p>
                    <div className="mt-4">
                      <span className="text-purple-600 font-medium text-sm hover:underline cursor-pointer">
                        전체 답변 보기 →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              카테고리별 FAQ
            </h2>
            <p className="text-lg text-gray-600">
              원하는 카테고리를 선택해서 빠르게 찾아보세요
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {faqCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-purple-50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
                <span className="text-sm">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="text-center mb-8">
              <p className="text-gray-600">
                "<span className="font-bold text-purple-600">{searchTerm}</span>" 검색 결과: {filteredFAQs.length}개
              </p>
            </div>
          )}

          {/* FAQ List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm font-medium">
                          {faq.category}
                        </span>
                        {faq.popular && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-medium">
                            인기
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 pr-4">{faq.question}</h3>
                    </div>
                    <div className={`text-2xl transform transition-transform ${expandedItems.includes(index) ? 'rotate-180' : ''}`}>
                      ⌄
                    </div>
                  </div>
                </button>
                
                {expandedItems.includes(index) && (
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                          A
                        </div>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 mb-4">검색 결과가 없습니다</p>
              <p className="text-sm text-gray-500">다른 키워드로 검색해보시거나 카테고리를 변경해보세요</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              여전히 궁금한 점이 있으신가요?
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              24시간 고객센터가 언제든 도와드립니다
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  📞
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">전화 문의</h3>
                <p className="text-gray-600 mb-4">24시간 365일 상담</p>
                <p className="text-2xl font-bold text-green-600">1588-1234</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  💬
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">카카오톡 문의</h3>
                <p className="text-gray-600 mb-4">빠른 채팅 상담</p>
                <p className="text-lg font-bold text-yellow-600">@carrydrop</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                  ✉️
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">이메일 문의</h3>
                <p className="text-gray-600 mb-4">상세한 문의사항</p>
                <p className="text-lg font-bold text-blue-600">help@carrydrop.co.kr</p>
              </div>
            </div>

            <Link 
              href={`/${lng}/contact`}
              className="bg-purple-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105 inline-block"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 