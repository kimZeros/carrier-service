'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function ContactPage({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeTerms: false
  });

  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);

  const inquiryTypes = [
    { value: 'service', label: '서비스 이용 문의', icon: '🚚' },
    { value: 'payment', label: '결제·환불 문의', icon: '💳' },
    { value: 'delivery', label: '배송 관련 문의', icon: '📦' },
    { value: 'membership', label: '멤버십 문의', icon: '👤' },
    { value: 'partnership', label: '제휴·비즈니스 문의', icon: '🤝' },
    { value: 'technical', label: '기술적 문제', icon: '⚙️' },
    { value: 'other', label: '기타 문의', icon: '❓' }
  ];

  const contactMethods = [
    {
      type: '전화 문의',
      detail: '1588-1234',
      description: '24시간 365일 상담 가능',
      hours: '평일 09:00~18:00 (한국어)\n24시간 (긴급상황)',
      icon: '📞',
      color: 'green'
    },
    {
      type: '카카오톡 문의',
      detail: '@carrydrop',
      description: '빠른 채팅 상담',
      hours: '평일 09:00~18:00\n주말 10:00~17:00',
      icon: '💬',
      color: 'yellow'
    },
    {
      type: '이메일 문의',
      detail: 'help@carrydrop.co.kr',
      description: '상세한 문의사항',
      hours: '24시간 접수\n평균 2시간 내 응답',
      icon: '✉️',
      color: 'blue'
    },
    {
      type: '영상 통화',
      detail: '사전 예약 필요',
      description: '화면 공유 기술 지원',
      hours: '평일 09:00~18:00\n예약제 운영',
      icon: '📹',
      color: 'purple'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type) {
      alert('문의 유형을 선택해주세요.');
      return;
    }
    if (!formData.name.trim()) {
      alert('이름을 입력해주세요.');
      return;
    }
    if (!formData.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!formData.subject.trim()) {
      alert('문의 제목을 입력해주세요.');
      return;
    }
    if (!formData.message.trim()) {
      alert('문의 내용을 입력해주세요.');
      return;
    }
    if (!formData.agreeTerms) {
      alert('개인정보 수집에 동의해주세요.');
      return;
    }

    alert('문의가 성공적으로 접수되었습니다! 빠른 시일 내에 답변드리겠습니다.');
    
    // 폼 초기화
    setFormData({
      type: '',
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      agreeTerms: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <span className="text-2xl mr-3">💬</span>
              <span className="font-medium">고객지원 센터</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              궁금한 점이 있으시나요?<br />언제든지 문의해주세요
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
              CarryDrop 전문 상담팀이 24시간<br />
              여러분의 궁금증을 해결해드립니다
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              다양한 방법으로 문의하세요
            </h2>
            <p className="text-lg text-gray-600">
              편한 방법을 선택해서 언제든지 연락주세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className={`w-16 h-16 bg-${method.color}-100 text-${method.color}-600 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{method.type}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-3">{method.detail}</p>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-sm text-gray-500 whitespace-pre-line">{method.hours}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                온라인 문의하기
              </h2>
              <p className="text-lg text-gray-600">
                아래 양식을 작성해주시면 빠르게 답변드리겠습니다
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border p-8">
              
              {/* Inquiry Type */}
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-4">
                  문의 유형 *
                </label>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inquiryTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => handleInputChange('type', type.value)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        formData.type === type.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{type.icon}</span>
                        <span className="font-medium">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="이름을 입력해주세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    문의 제목 *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    placeholder="간단한 제목을 입력해주세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  문의 내용 *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="문의 내용을 자세히 적어주세요. 서비스 이용 중 문제가 있었다면 언제, 어떤 상황에서 발생했는지 구체적으로 설명해주시면 더 정확한 답변을 드릴 수 있습니다."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 resize-none"
                  maxLength={2000}
                />
                <p className="text-sm text-gray-500 mt-2">{formData.message.length}/2000</p>
              </div>

              {/* Terms */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="mt-1 w-5 h-5 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">개인정보 수집 및 이용에 동의합니다. *</span>
                    <p className="mt-2">
                      수집 목적: 문의 답변 및 고객지원<br />
                      수집 항목: 이름, 이메일, 연락처, 문의내용<br />
                      보유 기간: 문의 해결 완료 후 1년
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-purple-500 text-white font-bold py-4 px-12 rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105"
                >
                  문의 접수하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            FAQ에서 답을 먼저 찾아보세요
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            자주 묻는 질문에서 빠르게 해결책을 찾을 수 있습니다
          </p>
          <Link 
            href={`/${lng}/faq`}
            className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 inline-block"
          >
            FAQ 확인하기
          </Link>
        </div>
      </section>
    </div>
  );
} 