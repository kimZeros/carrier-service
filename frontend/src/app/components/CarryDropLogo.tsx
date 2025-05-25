'use client';

import React from 'react';

interface CarryDropLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const CarryDropLogo: React.FC<CarryDropLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) => {
  const sizeConfig = {
    sm: { width: 120, height: 35, logoSize: 28 },
    md: { width: 160, height: 45, logoSize: 36 },
    lg: { width: 200, height: 55, logoSize: 44 }
  };

  const config = sizeConfig[size];

  return (
    <div className={`flex items-center ${className}`}>
      {/* SVG 로고 */}
      <div className="relative mr-3">
        <svg 
          width={config.logoSize} 
          height={config.logoSize} 
          viewBox="0 0 36 36" 
          className="hover:scale-110 transition-transform duration-300"
        >
          {/* 그라데이션 정의 */}
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15"/>
            </filter>
          </defs>
          
          {/* 메인 원형 배경 */}
          <circle 
            cx="18" 
            cy="18" 
            r="16" 
            fill="url(#primaryGradient)" 
            filter="url(#softShadow)"
          />
          
          {/* 캐리어 아이콘 */}
          <g transform="translate(11, 10)">
            {/* 캐리어 몸체 */}
            <rect 
              x="2" 
              y="6" 
              width="10" 
              height="8" 
              rx="1" 
              fill="#ffffff" 
            />
            
            {/* 캐리어 손잡이 */}
            <path 
              d="M 4 6 L 4 4 L 10 4 L 10 6" 
              stroke="#ffffff" 
              strokeWidth="1.2" 
              fill="none"
              strokeLinecap="round"
            />
            
            {/* 캐리어 바퀴 */}
            <circle cx="5" cy="15" r="0.8" fill="#ffffff" />
            <circle cx="9" cy="15" r="0.8" fill="#ffffff" />
            
            {/* 캐리어 중앙 라인 */}
            <line x1="7" y1="6" x2="7" y2="14" stroke="#ef4444" strokeWidth="0.8" />
            
            {/* 잠금장치 */}
            <rect x="6" y="9" width="2" height="1" rx="0.5" fill="#ef4444" />
          </g>
          
          {/* 포인트 효과 */}
          <circle cx="26" cy="10" r="1" fill="#fbbf24" opacity="0.8" />
        </svg>
      </div>
      
      {/* 텍스트 */}
      {showText && (
        <div className="flex flex-col">
          <span className="text-lg md:text-xl font-bold text-gray-800 leading-tight">
            캐리드롭
          </span>
          <span className="text-xs text-gray-500 leading-tight">
            CarryDrop
          </span>
        </div>
      )}
    </div>
  );
};

export default CarryDropLogo; 