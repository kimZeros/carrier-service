# 기술 컨텍스트

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (React 18)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS + common.scss
- **다국어**: next-i18next (한국어/일본어/영어)
- **아이콘**: Lucide React
- **빌드**: npm/pnpm

### Backend
- **Framework**: NestJS (Node.js) + Kotlin 모듈
- **언어**: TypeScript + Kotlin
- **데이터베이스**: PostgreSQL (Neon 클라우드)
- **ORM**: TypeORM (NestJS), JPA (Kotlin)
- **인증**: Spring Security (Kotlin 모듈)
- **빌드**: Gradle (Kotlin), npm (NestJS)

### 인프라
- **데이터베이스**: Neon PostgreSQL
- **환경변수**: process.env.DATABASE_URL
- **개발 서버**: 
  - Frontend: localhost:3000
  - Backend: localhost:8080

## 개발 환경 설정

### 필수 도구
- Node.js 18+
- Java 17+
- Git Bash (Windows)
- PostgreSQL 클라이언트

### 서버 실행 규칙
```bash
# Frontend 서버
cd frontend && npm run dev

# Backend 서버  
cd backend && ./gradlew bootRun
```

**중요**: 항상 Git Bash로 실행할 것

## 아키텍처 원칙

### 스타일링 규칙
- **CSS 중앙화**: 모든 스타일은 `src/styles/common.scss` 또는 Tailwind 사용
- **인라인 스타일 금지**: 페이지/컴포넌트 내부 인라인 스타일 사용 불가

### 데이터베이스 규칙
- **DB 조회**: "데이터 저장해" 요청시 information_schema.columns 먼저 조회
- **INSERT 예시**: 테이블 구조 확인 후 코드블록으로 예시 제공

### 보안 정책
- **Local Only**: 결제/로그인/본인인증은 목업으로 대체
- **실제 API 키 금지**: 외부 결제 서비스 연동 불가

### 지역 정책
- **오사카 우선**: 오사카 외 지역은 "서비스 예정(Coming soon)" 표시
- **일본 특화**: JAL ABC, Yamato TA-Q-BIN 등 일본 캐리어 서비스 벤치마킹

## 데이터 정책

### 통화 표시
- **기본 통화**: 원화(₩) 사용
- **가격 범위**: 25,000원-65,000원 (현실적 가격대)
- **경쟁업체 기준**: JAL ABC, Yamato TA-Q-BIN 요금 기반

### 데이터 보존
- **No-Delete 원칙**: 특별 지시 없으면 기존 페이지/컴포넌트/DB 데이터 삭제 금지

## 성능 최적화

### 터미널 관리
- **포트 체크**: `lsof -i:PORT` 또는 `pgrep node`로 실행 PID 확인
- **프로세스 관리**: 기존 서버 종료 후 새로 시작
- **터미널 재사용**: 첫 번째 통합 터미널 우선 사용

## 개발 워크플로우

### 코드 변경
1. 기능 요구사항 분석
2. 현재 코드 구조 파악
3. 최소 변경으로 기능 구현
4. 기존 기능 영향도 확인
5. 테스트 및 검증

### 디버깅
1. 브라우저 개발자 도구 확인
2. 콘솔 에러 메시지 분석
3. 네트워크 탭에서 API 호출 상태 확인
4. Backend 로그 확인

## 제약사항

### 기술적 제약
- Windows 10 환경 (PowerShell + Git Bash)
- 로컬 개발 환경만 지원
- 실제 결제 시스템 미연동

### 비즈니스 제약
- 일본 지역 특화 서비스
- 한국인 여행객 타겟
- 캐리어 배송에 특화된 기능 