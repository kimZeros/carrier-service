'use client';

import React, { useState } from 'react';

interface FAQSectionProps {
  lng: string;
  translations: {
    title: string;
    subtitle: string;
    q1: string;
    q2: string;
    q3: string;
  };
}

const FAQSection: React.FC<FAQSectionProps> = ({ lng, translations }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: translations.q1,
      answer: '나리타, 하네다, 간사이, 중부, 신치토세, 후쿠오카, 나하 공항에서 서비스를 제공합니다.'
    },
    {
      question: translations.q2,
      answer: '일반적으로 3-6시간 내에 숙소로 배송됩니다. 거리와 교통상황에 따라 차이가 있을 수 있습니다.'
    },
    {
      question: translations.q3,
      answer: '네, 에어비앤비 배송도 가능합니다! 호텔뿐만 아니라 에어비앤비, 게스트하우스 등 모든 숙소 유형으로 배송 가능합니다. 주소만 정확히 제공해주시면 됩니다.'
    },
    {
      question: '배송 가능한 캐리어 크기와 무게 제한이 있나요?',
      answer: '32인치(158cm) 이하의 캐리어, 최대 32kg까지 배송 가능합니다. 특수 물품은 별도 문의해주세요.'
    },
    {
      question: '숙소 간 이동 시에도 배송 서비스를 이용할 수 있나요?',
      answer: '네, 호텔에서 에어비앤비로, 에어비앤비에서 호텔로, 또는 같은 유형의 숙소 간 이동 시에도 배송 서비스를 이용하실 수 있습니다.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium">
            ❓ 자주 묻는 질문
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
          {translations.title}
        </h2>
        <p className="text-gray-600 text-center mb-16 max-w-3xl mx-auto text-lg">
          {translations.subtitle}
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-medium text-lg text-gray-800">{faq.question}</span>
                <span className={`text-red-500 text-2xl transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection; 