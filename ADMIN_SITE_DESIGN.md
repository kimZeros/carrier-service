# 🎯 캐리드롭 관리자 사이트 완전 설계안

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [권한별 메뉴 구성](#권한별-메뉴-구성)
3. [화면별 상세 설계](#화면별-상세-설계)
4. [DB 테이블 설계](#db-테이블-설계)
5. [API 엔드포인트](#api-엔드포인트)
6. [UX/UI 흐름](#uxui-흐름)
7. [보안 방안](#보안-방안)
8. [기술 스택](#기술-스택)
9. [개발 우선순위](#개발-우선순위)

---

## 🎯 프로젝트 개요

### 서비스명: 캐리드롭 (CarryDrop)
- **슬로건**: "짐은 맡기고, 쉼을 즐기다"
- **타겟**: 일본 여행 중 공항-숙소 간 캐리어 배송이 필요한 고객
- **핵심 기능**: 예약 관리, 실시간 배송 추적, 경쟁사 가격 비교

### 브랜딩
- **메인 컬러**: Coral (#FF6B6B)
- **서브 컬러**: Sky Blue (#4ECDC4)
- **로고**: 비행기 + 캐리어 조합

---

## 🔐 권한별 메뉴 구성

### 슈퍼어드민 (SUPER_ADMIN)
```
📊 대시보드 (전체 통계)
├── 📦 예약/배송 관리
├── 🏠 숙소/배송지 관리
├── 🚚 기사 관리
├── 👥 고객 관리
├── 💰 정산/수익 관리
├── 📞 문의/클레임 관리
├── 💲 경쟁업체 가격 비교 ⭐
├── ⚙️ 시스템 설정
├── 👤 관리자 계정 관리 ⭐
└── 📋 로그/감사 기록
```

### 일반 관리자 (ADMIN)
```
📊 대시보드 (제한된 통계)
├── 📦 예약/배송 관리
├── 🏠 숙소/배송지 관리
├── 🚚 기사 관리
├── 👥 고객 관리
├── 💰 정산 관리 (수익 제외)
└── 📞 문의/클레임 관리
```

### 배송기사 (DRIVER)
```
📱 내 배송건 목록
├── 📍 배송 상태 업데이트
└── 📋 배송 완료 보고
```

---

## 📱 화면별 상세 설계

### 1. 로그인 화면 (`/admin/login`)
```
┌─────────────────────────────────────┐
│           🛫 캐리드롭 관리자          │
│                                     │
│  📧 이메일: [________________]      │
│  🔒 비밀번호: [________________]    │
│                                     │
│         [로그인] [비밀번호 찾기]      │
│                                     │
│  💡 권한별 자동 리다이렉트:          │
│     - 슈퍼어드민 → 전체 대시보드      │
│     - 일반관리자 → 제한 대시보드      │
│     - 배송기사 → 내 배송건 목록       │
└─────────────────────────────────────┘
```

### 2. 대시보드 (`/admin/dashboard`)

#### 슈퍼어드민/일반관리자
```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ 📊 오늘 배송건수  │ 💰 오늘 매출     │ 🚚 활동중 기사   │ ⏳ 대기중 예약   │
│    125건        │   ¥375,000     │    8명          │    23건         │
│   ↗️ +12%       │   ↗️ +8.5%     │                │                │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ 🔥 긴급 클레임   │ 📈 월별 성장률   │ 👥 신규 고객     │ ✅ 완료율       │
│    3건          │   +15.2%       │    47명         │   96.8%        │
│                │   ↗️ +2.1%     │                │                │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

📈 최근 예약 현황 테이블
┌─────────────────────────────────────────────────────────────────────┐
│ 예약ID | 고객명 | 출발지→목적지 | 기사 | 상태 | 금액 | 시간 | 작업    │
├─────────────────────────────────────────────────────────────────────┤
│ #12345 | 김철수 | 하네다공항→시부야 | 이기사 | 배송중 | ¥3,000 | 14:30 │
│ #12346 | 박영희 | 신주쿠→나리타공항 | 미배정 | 대기중 | ¥3,500 | 15:00 │
└─────────────────────────────────────────────────────────────────────┘

🚨 실시간 알림                    📊 기사 현황
├── 긴급 클레임 발생               ├── 총 기사 수: 15명
├── 배송 완료                    ├── 활동중: 8명
└── 새 예약 접수                  ├── 휴무: 7명
                                └── 배송중: 5명
```

#### 배송기사 전용
```
┌─────────────────┬─────────────────┐
│ 📦 오늘 배송예정  │ ✅ 완료한 배송   │
│    5건          │    3건          │
├─────────────────┼─────────────────┤
│ 📍 현재 위치     │ 🕐 다음 픽업     │
│  도쿄역 근처     │   14:30        │
└─────────────────┴─────────────────┘

📍 오늘의 배송 루트 (지도)
📋 배송 일정 타임라인
```

### 3. 예약/배송 관리 (`/admin/reservations`)
```
🔍 검색/필터
┌─────────────────────────────────────────────────────────────────────┐
│ 예약ID: [_____] 고객명: [_____] 기사명: [_____] 상태: [▼] 날짜: [____] │
│ [🔍 검색] [🔄 초기화] [📊 통계보기] [📥 엑셀다운로드]                    │
└─────────────────────────────────────────────────────────────────────┘

📋 예약 목록 테이블
┌─────────────────────────────────────────────────────────────────────┐
│ 예약ID | 고객명 | 출발지→목적지 | 기사 | 상태 | 금액 | 픽업시간 | 작업  │
├─────────────────────────────────────────────────────────────────────┤
│ #12345 | 김철수 | 하네다공항→시부야 | 이기사 | 배송중 | ¥3,000 | 14:30 │
│ [📝메모] [📍추적] [📞연락] [🔄상태변경] [📋상세보기]                    │
├─────────────────────────────────────────────────────────────────────┤
│ #12346 | 박영희 | 시부야→나리타공항 | 미배정 | 대기중 | ¥3,500 | 15:00 │
│ [🚚기사배정] [📝메모] [📞연락] [📋상세보기]                              │
└─────────────────────────────────────────────────────────────────────┘

💡 빠른 작업
├── 🚚 기사 일괄 배정
├── 📧 고객 알림 발송
└── 📊 배송 통계 보기
```

### 4. 숙소/배송지 관리 (`/admin/accommodations`)
```
🔍 검색/필터
┌─────────────────────────────────────────────────────────────────────┐
│ 숙소명: [_____] 주소: [_____] 지역: [▼] 상태: [▼] [🔍 검색] [➕ 신규등록] │
└─────────────────────────────────────────────────────────────────────┘

🏠 숙소 목록
┌─────────────────────────────────────────────────────────────────────┐
│ 숙소명 | 주소 | 접근방법 | 배송가능시간 | 배송비 | 상태 | 작업        │
├─────────────────────────────────────────────────────────────────────┤
│ 시부야 게스트하우스 | 시부야구 1-2-3 | 🔐 도어락: 1234 | 09:00-21:00 │
│ ¥500 | 🟢 활성 | [✏️편집] [❌비활성화] [🗺️지도보기]                   │
├─────────────────────────────────────────────────────────────────────┤
│ 하라주쿠 민박 | 시부야구 4-5-6 | 📦 키박스: 현관옆 | 10:00-20:00    │
│ ¥600 | 🟢 활성 | [✏️편집] [❌비활성화] [🗺️지도보기]                   │
└─────────────────────────────────────────────────────────────────────┘

🔒 보안 고려사항
├── 접근코드 암호화 저장
├── 기사별 접근 권한 관리
└── 접근 로그 기록
```

### 5. 경쟁업체 가격 비교 (`/admin/competitor-prices`) - 슈퍼어드민만
```
📅 마지막 업데이트: 2024-01-15 09:00:00
┌─────────────────────────────────────────────────────────────────────┐
│ [🔄 수동 업데이트] [⚙️ 자동 업데이트 설정] [📧 알림 설정] [📊 분석 보고서] │
└─────────────────────────────────────────────────────────────────────┘

💲 가격 비교 테이블
┌─────────────────────────────────────────────────────────────────────┐
│ 경쟁업체 | 서비스명 | 지역 | 가격 | 우리가격 | 차이 | 변동 | 알림설정  │
├─────────────────────────────────────────────────────────────────────┤
│ LuggageHero | 공항배송 | 시부야 | ¥3,200 | ¥3,000 | -¥200 | 🔽 -5% │
│ [📧알림설정] [📊히스토리]                                              │
├─────────────────────────────────────────────────────────────────────┤
│ Bounce | 당일배송 | 신주쿠 | ¥3,800 | ¥3,500 | -¥300 | 🔽 -10%     │
│ [📧알림설정] [📊히스토리]                                              │
└─────────────────────────────────────────────────────────────────────┘

🎯 가격 정책 추천
├── 시부야 지역: 현재 가격 유지 권장
├── 신주쿠 지역: ¥200 인상 고려
└── ⚠️ 큰 가격 변동 알림: 3건
```

---

## 🗄️ DB 테이블 설계

### 핵심 테이블 구조

#### 1. 관리자 관련
```sql
-- 관리자 테이블
admins (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255), -- 암호화
    role ENUM('SUPER_ADMIN', 'ADMIN', 'DRIVER'),
    is_active BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- 배송기사 테이블
drivers (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255),
    password VARCHAR(255),
    phone VARCHAR(50),
    license_number VARCHAR(100),
    vehicle_info VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    is_available BOOLEAN DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

#### 2. 비즈니스 로직
```sql
-- 숙소 관리
accommodations (
    id UUID PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(500),
    detail_address VARCHAR(255),
    access_code VARCHAR(100), -- 암호화 저장
    access_instructions TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    delivery_start_time TIME DEFAULT '09:00',
    delivery_end_time TIME DEFAULT '21:00',
    delivery_fee INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- 예약 테이블 (기존 확장)
reservations (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    driver_id UUID REFERENCES drivers(id),
    accommodation_id UUID REFERENCES accommodations(id),
    from_place VARCHAR(255),
    to_place VARCHAR(255),
    pickup_time TIMESTAMP,
    dropoff_time TIMESTAMP,
    price INTEGER,
    status ENUM('PENDING', 'PAID', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'),
    admin_notes TEXT,
    customer_notes TEXT,
    qr_code VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)
```

#### 3. 경쟁사 가격 관리
```sql
-- 경쟁업체 가격 (UPDATE 방식으로 최신 가격만 유지)
competitor_prices (
    id UUID PRIMARY KEY,
    competitor_name VARCHAR(255),
    service_name VARCHAR(255),
    region VARCHAR(255),
    price INTEGER,
    currency VARCHAR(10) DEFAULT 'JPY',
    service_description TEXT,
    source_url VARCHAR(500),
    last_updated TIMESTAMP,
    created_at TIMESTAMP,
    UNIQUE(competitor_name, service_name, region) -- 중복 방지
)
```

#### 4. 관리 시스템
```sql
-- 문의/클레임
inquiries (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    reservation_id UUID REFERENCES reservations(id),
    type ENUM('GENERAL', 'COMPLAINT', 'REFUND', 'TECHNICAL'),
    title VARCHAR(255),
    content TEXT,
    status ENUM('PENDING', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'),
    assigned_admin_id UUID REFERENCES admins(id),
    admin_response TEXT,
    responded_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- 정산 관리
settlements (
    id UUID PRIMARY KEY,
    reservation_id UUID REFERENCES reservations(id),
    driver_id UUID REFERENCES drivers(id),
    type ENUM('DELIVERY_FEE', 'COMMISSION', 'REFUND', 'BONUS'),
    amount INTEGER,
    currency VARCHAR(10) DEFAULT 'JPY',
    description TEXT,
    settlement_date TIMESTAMP,
    is_processed BOOLEAN DEFAULT false,
    processed_at TIMESTAMP,
    processed_by_admin_id UUID REFERENCES admins(id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

-- 관리자 활동 로그
admin_logs (
    id UUID PRIMARY KEY,
    admin_id UUID REFERENCES admins(id),
    action ENUM('CREATE', 'UPDATE', 'DELETE', 'VIEW', 'LOGIN', 'LOGOUT'),
    target_table VARCHAR(100),
    target_id VARCHAR(255),
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP
)
```

---

## 🔌 API 엔드포인트

### 인증
```
POST /api/admin/login
POST /api/admin/logout
GET  /api/admin/me
```

### 대시보드
```
GET /api/admin/dashboard
GET /api/admin/dashboard/stats
GET /api/admin/dashboard/recent-reservations
```

### 예약/배송 관리
```
GET    /api/admin/reservations
GET    /api/admin/reservations/{id}
PUT    /api/admin/reservations/{id}/status
PUT    /api/admin/reservations/{id}/assign-driver
POST   /api/admin/reservations/{id}/notes
```

### 기사 관리
```
GET    /api/admin/drivers
POST   /api/admin/drivers
PUT    /api/admin/drivers/{id}
PUT    /api/admin/drivers/{id}/availability
DELETE /api/admin/drivers/{id}
```

### 숙소 관리
```
GET    /api/admin/accommodations
POST   /api/admin/accommodations
PUT    /api/admin/accommodations/{id}
DELETE /api/admin/accommodations/{id}
```

### 경쟁사 가격 (슈퍼어드민만)
```
GET  /api/admin/competitor-prices
POST /api/admin/competitor-prices/update
PUT  /api/admin/competitor-prices/{id}/alert-settings
```

### 문의/클레임
```
GET /api/admin/inquiries
PUT /api/admin/inquiries/{id}/assign
PUT /api/admin/inquiries/{id}/respond
```

### 정산
```
GET /api/admin/settlements
PUT /api/admin/settlements/{id}/process
GET /api/admin/settlements/reports
```

---

## 🎨 UX/UI 흐름

### 관리자 로그인 시나리오
```
1. 로그인 페이지 접속
2. 이메일/비밀번호 입력
3. 권한 확인 후 자동 리다이렉트
   ├── 슈퍼어드민 → 전체 대시보드
   ├── 일반관리자 → 제한된 대시보드  
   └── 배송기사 → 내 배송건 목록
4. 세션 유지 (4-8시간)
```

### 예약 처리 시나리오
```
1. 새 예약 알림 수신
2. 예약 상세 정보 확인
3. 기사 배정
   ├── 자동 배정 (거리/시간 기반)
   └── 수동 배정 (관리자 선택)
4. 고객/기사에게 알림 발송
5. 실시간 배송 추적
6. 배송 완료 확인
7. 정산 처리
```

### 긴급상황 대응 시나리오
```
1. 클레임/문제 신고 접수
2. 긴급도 자동 분류
3. 담당 관리자 자동 배정
4. 실시간 알림 발송
5. 문제 해결 과정 기록
6. 고객 만족도 확인
```

---

## 🛡️ 보안 방안

### 1. 인증/인가
- **JWT 토큰** 기반 인증
- **Role-Based Access Control (RBAC)**
- 세션 타임아웃 (관리자: 4시간, 기사: 8시간)
- 비밀번호 정책 (최소 8자, 특수문자 포함)

### 2. 데이터 보호
```kotlin
// 숙소 접근코드 암호화
@Column(nullable = true)
@Convert(converter = EncryptedStringConverter::class)
var accessCode: String? = null

// 개인정보 마스킹
fun maskPhoneNumber(phone: String): String {
    return phone.replaceRange(3, 7, "****")
}
```

### 3. 활동 로깅
- 모든 CRUD 작업 로깅
- IP 주소, User-Agent 기록
- 민감한 정보 접근 로깅
- 로그 보관 기간: 1년

### 4. 네트워크 보안
- HTTPS 강제 적용
- CORS 정책 설정
- Rate Limiting 적용

---

## 🔧 기술 스택

### 프론트엔드
```json
{
  "framework": "Next.js 14 (App Router)",
  "language": "TypeScript",
  "styling": "TailwindCSS + Shadcn/ui",
  "state": "Zustand + React Query",
  "forms": "React Hook Form + Zod",
  "charts": "Chart.js / Recharts",
  "maps": "Mapbox GL JS",
  "icons": "Lucide React"
}
```

### 백엔드 (기존)
```json
{
  "framework": "Spring Boot 3.2",
  "language": "Kotlin 1.9",
  "database": "PostgreSQL 15 (Neon)",
  "orm": "JPA + Hibernate",
  "migration": "Flyway",
  "auth": "JWT + Spring Security",
  "validation": "Bean Validation"
}
```

### 인프라
```json
{
  "deployment": "Docker + Docker Compose",
  "reverse_proxy": "Nginx",
  "monitoring": "Spring Boot Actuator",
  "logging": "Logback + ELK Stack (선택)"
}
```

---

## 🚀 개발 우선순위

### Phase 1: MVP (4주)
```
Week 1-2: 기본 인증 시스템
├── 관리자 로그인/로그아웃
├── 권한별 메뉴 제어
├── 기본 대시보드
└── 예약 목록 조회

Week 3-4: 핵심 관리 기능
├── 예약 상태 변경
├── 기사 배정
├── 기본 통계
└── 간단한 검색/필터
```

### Phase 2: 확장 기능 (6주)
```
Week 5-7: 고급 관리 기능
├── 숙소 관리 시스템
├── 문의/클레임 관리
├── 정산 시스템
└── 관리자 로그 시스템

Week 8-10: 사용성 개선
├── 실시간 알림
├── 고급 검색/필터
├── 엑셀 다운로드
└── 모바일 최적화
```

### Phase 3: 고도화 (8주)
```
Week 11-14: 경쟁사 분석
├── 가격 수집 배치
├── 가격 비교 대시보드
├── 알림 시스템
└── 가격 정책 추천

Week 15-18: 고급 기능
├── 실시간 지도 추적
├── 자동 기사 배정
├── 고급 분석 대시보드
└── 다국어 지원
```

---

## 💡 추가 개선 아이디어

### 1. 자동화 기능
- **스마트 기사 배정**: AI 기반 최적 경로 계산
- **동적 가격 책정**: 수요/공급에 따른 실시간 가격 조정
- **예측 분석**: 수요 예측을 통한 기사 배치 최적화

### 2. 고객 경험 개선
- **실시간 채팅**: 고객-기사-관리자 3자 채팅
- **배송 라이브 스트리밍**: 실시간 배송 과정 확인
- **스마트 알림**: 개인화된 알림 시스템

### 3. 비즈니스 인텔리전스
- **수익성 분석**: 지역별, 시간대별 수익 분석
- **고객 세그멘테이션**: 고객 행동 패턴 분석
- **운영 효율성**: 기사 성과 분석 및 개선점 도출

### 4. 확장성 고려
- **마이크로서비스 아키텍처**: 서비스별 독립 배포
- **이벤트 드리븐 아키텍처**: 실시간 이벤트 처리
- **글로벌 확장**: 다국가 서비스 지원

---

## 📞 문의 및 지원

이 설계안에 대한 질문이나 추가 요구사항이 있으시면 언제든 말씀해 주세요!

**주요 구현 파일들:**
- `backend/src/main/kotlin/com/carrydrop/entity/` - 엔티티 클래스들
- `backend/src/main/kotlin/com/carrydrop/controller/AdminController.kt` - 관리자 API
- `backend/src/main/resources/db/migration/V2__Add_admin_entities.sql` - DB 마이그레이션
- `frontend/app/admin/` - 관리자 사이트 프론트엔드
- `tailwind.config.ts` - 스타일 설정 (coral 색상 포함)

이제 단계별로 개발을 시작하실 수 있습니다! 🚀 