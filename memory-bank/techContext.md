# 기술 컨텍스트 (Tech Context)

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Internationalization**: next-i18next
- **Icons**: Emoji-based (🏨, 🛫, ⭐ 등)

### Backend
- **Framework**: NestJS + Spring Boot
- **Language**: Kotlin
- **ORM**: MyBatis
- **Security**: Spring Security
- **API**: RESTful API

### Database
- **Production**: PostgreSQL via Neon (클라우드)
- **Connection**: `process.env.DATABASE_URL`
- **Current Data**: 11개 숙소 데이터
- **Encoding**: UTF-8 (한국어 지원)

### Development Tools
- **Terminal**: Git Bash (필수)
- **Frontend Dev**: `npm run dev` (포트 3000)
- **Backend Dev**: `./gradlew bootRun` (포트 8080)

### Deployment
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (리버스 프록시)
- **Environment**: 환경변수 기반 설정

## 개발 환경 설정

### 필수 환경 변수
```bash
DATABASE_URL=postgresql://neondb_owner:npg_sdMQ1b5JzAhK@ep-calm-rain-a139nit8-pooler.ap-southeast-1.aws.neon.tech/neondb
```

### 개발 서버 실행 (Git Bash 필수)
```bash
# Frontend
cd frontend && npm run dev

# Backend  
cd backend && ./gradlew bootRun
```

### 포트 구성
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080
- **Database**: 클라우드 (Neon)

## 데이터베이스 구성

### PostgreSQL 특화 설정
```sql
-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 테이블 생성 (H2 → PostgreSQL 마이그레이션 완료)
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

### 데이터 특성
- **시간 형식**: PostgreSQL TIME 타입 → 배열 반환 `[hour, minute]`
- **한국어 숙소명**: UTF-8 인코딩으로 저장
- **가격 단위**: 원화(₩) 정수 형태
- **활성 상태**: `is_active` 필드로 관리

## 프론트엔드 아키텍처

### Next.js App Router 구조
```
src/app/
├── [lng]/                     # 다국어 동적 라우팅
│   ├── page.tsx               # 메인 페이지
│   ├── layout.tsx             # 언어별 레이아웃
│   ├── accommodation-guide/   # 숙소 안내
│   ├── service-guide/         # 서비스 가이드
│   ├── membership/            # 멤버십
│   ├── reviews/               # 이용후기 (신규)
│   ├── request-delivery/      # 배송 신청
│   ├── login/                 # 로그인
│   └── signup/                # 회원가입
├── components/                # 공용 컴포넌트
├── globals.css               # 전역 스타일
└── admin/                    # 관리자 페이지
```

### TypeScript 인터페이스
```typescript
interface Accommodation {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  latitude: number;
  longitude: number;
  deliveryStartTime: string | number[]; // PostgreSQL 대응
  deliveryEndTime: string | number[];
  deliveryFee: number;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: Promise<{
    lng: string;
  }>;
}
```

### 스타일링 방침
- **Tailwind CSS**: 모든 스타일링의 기본
- **공통 스타일**: `src/styles/common.scss` 집중 관리
- **인라인 스타일 금지**: 컴포넌트 내부 스타일 금지
- **그라데이션 패턴**: purple-blue-indigo 계열 사용

## 백엔드 아키텍처

### Spring Boot + Kotlin 구성
```kotlin
@RestController
@RequestMapping("/api/accommodations")
@CrossOrigin(origins = ["http://localhost:3000"])
class AccommodationController {
    
    @GetMapping("/active")
    fun getActiveAccommodations(): List<Accommodation> {
        // MyBatis를 통한 데이터 조회
    }
}
```

### 보안 설정
```kotlin
@Configuration
@EnableWebSecurity
class SecurityConfig {
    // CORS 설정: Frontend(3000) ↔ Backend(8080)
    // 공개 API: /api/accommodations/**
}
```

### MyBatis 매핑
- **SQL 파일**: resources/mapper/AccommodationMapper.xml
- **동적 쿼리**: 활성 숙소 필터링
- **타입 안전성**: Kotlin data class 활용

## API 명세

### 주요 엔드포인트
```
GET /api/accommodations/active
- Response: List<Accommodation>
- 활성 상태인 숙소 목록 반환
- CORS 허용: localhost:3000

GET /api/accommodations/{id}
- Response: Accommodation
- 특정 숙소 상세 정보

POST /api/accommodations (관리자)
- Request: AccommodationCreateRequest
- Response: Accommodation

PUT /api/accommodations/{id} (관리자)
- Request: AccommodationUpdateRequest
- Response: Accommodation
```

### 응답 형식
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "기온 헤리티지 료칸",
  "address": "교토부 교토시 히가시야마구 기온마치 키타가와 570",
  "detailAddress": null,
  "latitude": 35.0036,
  "longitude": 135.7778,
  "deliveryStartTime": [8, 0],
  "deliveryEndTime": [19, 0],
  "deliveryFee": 4500000,
  "isActive": true,
  "notes": "기온 게이샤 구역, 전통 일본 입구",
  "createdAt": "2024-01-16T10:00:00Z",
  "updatedAt": "2024-01-16T10:00:00Z"
}
```

## 현재 기술적 이슈

### 1. 서버 시작 문제
**증상**: 
- PowerShell에서 `&&` 구문 오류
- Git Bash 환경 명령 실행 실패
- Backend 서버 포트 8080 바인딩 문제

**해결 필요**:
- Git Bash 환경에서 안정적인 `./gradlew bootRun` 실행
- 포트 충돌 확인 및 해결
- 개발 환경 표준화

### 2. API 연동 문제
**증상**:
- Frontend에서 "Failed to fetch accommodations" 오류
- accommodation-guide 페이지에서 5개만 표시 (실제 11개)

**예상 원인**:
- Backend 서버 미실행 상태
- CORS 설정 문제
- API 엔드포인트 접근 실패

## 의존성 및 패키지

### Frontend 주요 패키지
```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "next-i18next": "latest"
}
```

### Backend 주요 의존성
```kotlin
// build.gradle.kts
implementation("org.springframework.boot:spring-boot-starter-web")
implementation("org.springframework.boot:spring-boot-starter-security")
implementation("org.mybatis.spring.boot:mybatis-spring-boot-starter")
implementation("org.postgresql:postgresql")
```

## 성능 및 최적화

### 현재 최적화 상태
- ✅ **Next.js App Router**: 최신 라우팅 시스템
- ✅ **TypeScript**: 타입 안전성 확보
- ✅ **Tailwind CSS**: 최적화된 스타일링
- ✅ **PostgreSQL**: 스케일러블한 데이터베이스

### 향후 최적화 계획
- 🔄 **이미지 최적화**: Next.js Image 컴포넌트 활용
- 🔄 **코드 스플리팅**: 페이지별 번들 분리
- 🔄 **캐싱 전략**: API 응답 캐싱
- 🔄 **SEO 최적화**: 메타데이터 관리

## 개발 워크플로우

### 표준 개발 프로세스
1. **환경 준비**: Git Bash 터미널 사용
2. **서버 실행**: Backend → Frontend 순서
3. **기능 개발**: TypeScript + Kotlin
4. **테스트**: API 엔드포인트 검증
5. **스타일링**: Tailwind CSS 활용

### 사용자 요구사항 반영 패턴
- **현실적 가격**: JAL ABC, Yamato 벤치마킹
- **원화 표시**: ₩ 단위 통일
- **Git Bash 환경**: 개발 환경 고정
- **실제 데이터**: PostgreSQL 기반 검증

## 보안 고려사항

### 개발 단계 보안
- **환경변수**: 데이터베이스 URL 보호
- **CORS 설정**: localhost:3000만 허용
- **목업 서비스**: 실제 API 키 사용 금지

### 배포 단계 보안 (예정)
- **HTTPS**: SSL 인증서 적용
- **환경 분리**: 개발/스테이징/프로덕션
- **데이터 암호화**: 민감 정보 보호 