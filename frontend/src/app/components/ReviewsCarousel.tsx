'use client';

import React, { useState, useEffect } from 'react';

interface Review {
  name: string;
  location: string;
  review: string;
  rating: number;
}

interface ReviewsCarouselProps {
  reviews: Review[];
  lng: string;
  translations: {
    title: string;
    subtitle: string;
  };
}

const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews, lng, translations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 자동 롤링 기능
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [isAutoPlaying, reviews.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // 3초 후 자동 재생 재시작
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
            ⭐ 고객 리뷰
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          {translations.title}
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-2xl mx-auto text-lg">
          {translations.subtitle}
        </p>

        <div className="max-w-4xl mx-auto relative">
          {/* 후기 카드 */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="text-6xl mb-6 text-red-200">"</div>
              
              {/* 별점 */}
              <div className="flex justify-center mb-6">
                {[...Array(reviews[currentIndex]?.rating || 5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>
              
              {/* 고객 정보 */}
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {reviews[currentIndex]?.name}
              </h3>
              <p className="text-gray-500 mb-8">
                {reviews[currentIndex]?.location}
              </p>
              
              {/* 후기 내용 */}
              <div className="min-h-[120px] flex items-center justify-center">
                <p className="text-lg text-gray-700 italic leading-relaxed max-w-3xl">
                  "{reviews[currentIndex]?.review}"
                </p>
              </div>
            </div>
          </div>

          {/* 네비게이션 화살표 */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:shadow-xl transition-all duration-300 z-10"
          >
            <span className="text-xl">‹</span>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:shadow-xl transition-all duration-300 z-10"
          >
            <span className="text-xl">›</span>
          </button>
        </div>

        {/* 인디케이터 점들 */}
        <div className="flex justify-center space-x-3 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-red-500 scale-125' 
                  : 'bg-gray-300 hover:bg-red-300'
              }`}
            />
          ))}
        </div>

        {/* 자동 재생 상태 표시 */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-300"
          >
            {isAutoPlaying ? '⏸️ 자동 재생 중' : '▶️ 자동 재생 시작'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel; 