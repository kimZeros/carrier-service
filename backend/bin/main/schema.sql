-- CarryDrop 테이블 생성 스크립트 (PostgreSQL 호환)

-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 숙소 테이블
CREATE TABLE IF NOT EXISTS accommodations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(500) NOT NULL,
    detail_address VARCHAR(255),
    access_code VARCHAR(100),
    access_instructions TEXT,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    delivery_start_time TIME NOT NULL DEFAULT '09:00:00',
    delivery_end_time TIME NOT NULL DEFAULT '21:00:00',
    delivery_fee INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 경쟁업체 가격 테이블
CREATE TABLE IF NOT EXISTS competitor_prices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    competitor_name VARCHAR(255) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'JPY',
    service_description TEXT,
    source_url VARCHAR(500),
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_accommodations_coordinates ON accommodations(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_accommodations_active ON accommodations(is_active);
CREATE INDEX IF NOT EXISTS idx_competitor_prices_competitor ON competitor_prices(competitor_name);
CREATE INDEX IF NOT EXISTS idx_competitor_prices_region ON competitor_prices(region); 