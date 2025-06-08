# 시스템 패턴 (System Patterns)

## 아키텍처 개요

### 전체 시스템 구조
```
Frontend (Next.js) ←→ Backend (NestJS + Kotlin) ←→ Database (PostgreSQL via Neon)
     ↓                        ↓                           ↓
  - React 18               - Spring Boot              - Neon PostgreSQL
  - TypeScript             - Kotlin + MyBatis         - 11개 숙소 데이터
  - Tailwind CSS           - RESTful API               - UTF-8 한국어 지원
  - i18n (다국어)          - CORS 설정                 - UUID 기본키
```

### 주요 기술 스택
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: NestJS, Kotlin, Spring Boot, MyBatis
- **Database**: PostgreSQL via Neon (클라우드 데이터베이스)
- **인프라**: Docker Compose, Nginx (설정 완료)

## 데이터베이스 설계

### 핵심 테이블 구조

#### accommodations 테이블
```sql
CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    detail_address VARCHAR(255),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    delivery_start_time TIME,
    delivery_end_time TIME,
    delivery_fee INTEGER,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

#### PostgreSQL 특화 구현
- **UUID 확장**: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
- **시간 데이터**: TIME 타입으로 저장, 배열로 반환 `[hour, minute]`
- **한국어 지원**: UTF-8 인코딩으로 한국어 숙소명 저장
- **현재 데이터**: 11개 숙소 (도쿄 4개, 오사카 2개, 교토 2개, 기타 3개)

### 데이터 마이그레이션 히스토리
1. **H2 → PostgreSQL**: 개발용 인메모리에서 클라우드 DB로 이전
2. **문법 호환성**: `RANDOM_UUID()` → `uuid_generate_v4()`, `DOUBLE` → `DOUBLE PRECISION`
3. **시간 처리**: PostgreSQL의 TIME 배열 반환 대응

## API 설계 패턴

### RESTful API 구조
```
GET /api/accommodations/active     - 활성 숙소 목록
GET /api/accommodations/{id}       - 특정 숙소 상세
POST /api/accommodations           - 숙소 등록 (관리자)
PUT /api/accommodations/{id}       - 숙소 수정 (관리자)
DELETE /api/accommodations/{id}    - 숙소 삭제 (관리자)
```

#### 응답 데이터 형식
```typescript
interface Accommodation {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  latitude: number;
  longitude: number;
  deliveryStartTime: string | number[]; // PostgreSQL 시간 배열 대응
  deliveryEndTime: string | number[];
  deliveryFee: number;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
```

### CORS 및 보안 설정
```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig {
    // /api/accommodations/** 경로 허용
    // CORS 설정으로 Frontend(3000) ↔ Backend(8080) 통신
}
```

## 프론트엔드 아키텍처

### 페이지 구조 패턴
```
src/app/[lng]/
├── page.tsx                    # 메인 페이지
├── accommodation-guide/        # 숙소 안내 (API 연동)
├── service-guide/             # 서비스 가이드
├── membership/                # 멤버십 페이지
├── reviews/                   # 이용후기 (신규)
├── request-delivery/          # 배송 신청
├── login/                     # 로그인
└── signup/                    # 회원가입
```

### 컴포넌트 패턴

#### 1. Client Component 패턴
```typescript
'use client';
import { useState, useEffect } from 'react';

// API 호출과 상태 관리를 포함한 컴포넌트
export default function ComponentName({ params }: PageProps) {
  const [lng, setLng] = useState('ko');
  // params 비동기 처리 패턴
  useEffect(() => {
    const initializePage = async () => {
      const resolvedParams = await params;
      setLng(resolvedParams.lng);
    };
    initializePage();
  }, [params]);
}
```

#### 2. 시간 포맷팅 패턴
```typescript
const formatTime = (time: string | number[]) => {
  // PostgreSQL 배열 [hour, minute] 처리
  if (Array.isArray(time)) {
    const [hour, minute] = time;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
  // 문자열 형태 처리
  if (typeof time === 'string') {
    return time.substring(0, 5);
  }
  return '00:00';
};
```

#### 3. 가격 표시 패턴
```typescript
const formatPrice = (amount: number) => {
  // 큰 숫자는 100으로 나누어서 현실적인 가격으로 표시
  if (amount > 100000) {
    return `₩${Math.floor(amount / 100).toLocaleString()}`;
  }
  return `₩${amount.toLocaleString()}`;
};
```

### 다국어 지원 패턴
```typescript
// Layout에서 번역 전달
const translations = {
  nav_service_guide: t('nav_service_guide'),
  nav_accommodations: t('nav_accommodations'),
  nav_membership: t('nav_membership'),
  nav_reviews: t('nav_reviews'),
  // ...
};
```

## 스타일링 패턴

### Tailwind CSS 구조
- **공통 스타일**: `src/styles/common.scss` 또는 `tailwind.css`에 집중
- **인라인 스타일 금지**: 모든 스타일은 CSS 파일로 관리
- **컴포넌트별 스타일 금지**: 페이지/컴포넌트 내부 인라인 스타일 사용 안 함

### UI 디자인 패턴

#### 1. 그라데이션 배경
```css
bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700
bg-gradient-to-r from-purple-600 to-blue-600
```

#### 2. 카드 디자인
```css
bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all
```

#### 3. 버튼 스타일
```css
/* 주요 액션 */
bg-purple-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-purple-600 transition-all transform hover:scale-105

/* 보조 액션 */
border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all
```

## 데이터 플로우 패턴

### API 호출 플로우
```
1. Frontend Component (useEffect)
   ↓
2. fetch('http://localhost:8080/api/accommodations/active')
   ↓
3. Backend Controller (AccommodationController)
   ↓
4. Service Layer → MyBatis Mapper
   ↓
5. PostgreSQL Database (Neon)
   ↓
6. Response → Frontend State Update
```

### 에러 처리 패턴
```typescript
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

try {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  setData(data);
} catch (err) {
  setError(err instanceof Error ? err.message : 'An error occurred');
} finally {
  setLoading(false);
}
```

## 현재 아키텍처 이슈

### 1. API 연동 문제
**증상**: Frontend에서 Backend API 호출 실패
**원인**: 
- Backend 서버 시작 문제 (포트 8080)
- CORS 설정 이슈 가능성
- Git Bash 환경 실행 문제

**해결 방향**:
- Git Bash에서 `./gradlew bootRun` 안정적 실행
- CORS 설정 재확인
- 포트 충돌 문제 확인

### 2. 데이터 표시 문제
**현상**: accommodation-guide 페이지에서 5개만 표시
**예상 원인**:
- API 호출 실패로 인한 기본 하드코딩 데이터 표시
- PostgreSQL 연결 문제
- 데이터 로딩 오류

## 배포 및 환경 구성

### 개발 환경
- **Frontend**: `npm run dev` (포트 3000)
- **Backend**: `./gradlew bootRun` (포트 8080)
- **Database**: PostgreSQL via Neon (클라우드)
- **터미널**: Git Bash 환경 고정

### Docker 구성 (설정 완료)
- `docker-compose.yml`: 멀티 컨테이너 구성
- `nginx.conf`: 리버스 프록시 설정
- 실제 배포시 사용 가능

## 보안 및 인증 패턴

### 목업 기반 접근
- **결제 시스템**: 실제 API 키 사용 금지, 목업 레이어로 대체
- **로그인/본인인증**: 목업 구현으로 개발
- **관리자 기능**: 기본 인증만 구현

### 데이터 보안
- PostgreSQL 연결은 환경변수 `process.env.DATABASE_URL` 사용
- Neon 클라우드 데이터베이스의 기본 보안 정책 적용 