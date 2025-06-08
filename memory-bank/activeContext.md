# 현재 작업 컨텍스트

## 최근 완료된 작업

### 1. 가격 체계 현실화 (2024-01-15)
**문제**: 기존 가격이 비현실적 (₩수천만원 단위)
**해결**: 일본 경쟁업체 벤치마킹으로 현실적 가격 적용

#### 변경된 가격 정책
- **기본 배송**: ₩25,000 - ₩65,000
- **프리미엄 서비스**: ₩35,000 - ₩85,000  
- **멤버십**: ₩2,980 - ₩4,980/월
- **경쟁업체 기준**: JAL ABC, Yamato TA-Q-BIN 요금 참고

#### 수정된 파일들
- `frontend/src/app/[lng]/page.tsx` - 메인 페이지 가격
- `frontend/src/locales/ko/common.json` - CTA 가격
- `frontend/src/app/[lng]/service-guide/page.tsx` - 요금제
- `frontend/src/app/[lng]/membership/page.tsx` - 멤버십 가격
- `frontend/src/app/[lng]/accommodation-guide/page.tsx` - 숙소별 배송비
- 관리자 페이지들 가격 표시 함수 수정

### 2. 실제 DB 데이터 연동 시도
**목표**: accommodations 테이블 데이터를 메인 화면에 표시
**현황**: 
- ✅ AccommodationController 생성
- ✅ AccommodationsList 컴포넌트 생성
- ✅ 메인 페이지에 컴포넌트 추가
- ⚠️ 백엔드 서버 연동 이슈 (포트 8080 문제)

#### 생성된 파일들
- `backend/src/main/kotlin/com/carrydrop/controller/AccommodationController.kt`
- `frontend/src/app/components/AccommodationsList.tsx`
- SecurityConfig 수정 (`/api/accommodations/**` 경로 허용)

## 현재 이슈

### 1. 백엔드 서버 연동 문제
**증상**: 
- Frontend에서 "Failed to fetch accommodations" 오류
- Backend 서버가 포트 8080에서 시작되지 않음
- PowerShell에서 Git Bash 실행 문제

**해결 시도한 방법**:
- `gradlew.bat bootRun` 사용
- Java 프로세스 종료 후 재시작
- SecurityConfig에서 CORS 설정 추가

**현재 상태**: 미해결

### 2. 터미널 환경 이슈
**문제**: PowerShell에서 Git Bash 명령 실행 실패
**사용자 요구사항**: 항상 Git Bash로 서버 실행
**해결 필요**: 안정적인 서버 시작 방법 확립

## 다음 우선순위

### High Priority
1. **백엔드 서버 연동 해결**
   - 포트 8080 바인딩 문제 해결
   - Git Bash 환경에서 안정적 서버 시작
   - API 엔드포인트 정상 동작 확인

2. **실제 DB 데이터 표시**
   - AccommodationsList 컴포넌트 정상 작동
   - 메인 페이지에서 실제 숙소 데이터 확인
   - 가격 표시 형식 검증

### Medium Priority
3. **관리자 기능 완성**
   - 숙소 등록/수정 기능
   - 예약 관리 시스템
   - 대시보드 실시간 데이터 연동

4. **사용자 기능 확장**
   - 배송 신청 폼 백엔드 연동
   - 실시간 배송 추적
   - 결제 시스템 (목업)

### Low Priority
5. **국제화 완성**
   - 일본어/영어 번역 추가
   - 지역별 컨텐츠 차별화

6. **성능 최적화**
   - 이미지 최적화
   - 캐싱 전략 구현
   - SEO 최적화

## 기술적 의사결정

### 확정된 사항
- ✅ 원화(₩) 가격 정책으로 통일
- ✅ JAL ABC, Yamato TA-Q-BIN 기준 요금제
- ✅ 오사카 중심 서비스 (타 지역은 "Coming Soon")
- ✅ Git Bash 환경 고정

### 검토 필요 사항
- 🔄 백엔드 포트 변경 (8080 → 8081) 고려
- 🔄 개발환경 Docker 컨테이너화 검토
- 🔄 실제 일본 주소/GPS 좌표 데이터 확보

## 사용자 피드백

### 최근 요청사항
1. "엔화로 표시되어 있는 것들 원화로 표기 변경" ✅ 완료
2. "내 DB accommodations 테이블 데이터를 메인 화면에 테스트용으로 확인" 🔄 진행중
3. "가격이 말이 안 돼 - 타 경쟁업체 벤치마킹해서 현실적인 가격으로 변경" ✅ 완료
4. "항상 git bash로 실행해줘" 🔄 적용중

### 패턴 분석
- 현실적이고 실용적인 서비스 지향
- 일본 현지 시장 상황 반영 중요
- 개발 환경 안정성 우선
- 실제 데이터 기반 검증 선호 