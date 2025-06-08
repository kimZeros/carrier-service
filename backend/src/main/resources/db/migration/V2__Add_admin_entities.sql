-- 관리자 테이블 생성
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 배송기사 테이블 생성
CREATE TABLE drivers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    license_number VARCHAR(100),
    vehicle_info VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_available BOOLEAN NOT NULL DEFAULT true,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 숙소 테이블 생성
CREATE TABLE accommodations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- 경쟁업체 가격 테이블 생성
CREATE TABLE competitor_prices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    competitor_name VARCHAR(255) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'JPY',
    service_description TEXT,
    source_url VARCHAR(500),
    last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(competitor_name, service_name, region)
);

-- 문의/클레임 테이블 생성
CREATE TABLE inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    reservation_id UUID REFERENCES reservations(id),
    type VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    assigned_admin_id UUID REFERENCES admins(id),
    admin_response TEXT,
    responded_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 정산 테이블 생성
CREATE TABLE settlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reservation_id UUID NOT NULL REFERENCES reservations(id),
    driver_id UUID REFERENCES drivers(id),
    type VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'JPY',
    description TEXT,
    settlement_date TIMESTAMP NOT NULL,
    is_processed BOOLEAN NOT NULL DEFAULT false,
    processed_at TIMESTAMP,
    processed_by_admin_id UUID REFERENCES admins(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 관리자 로그 테이블 생성
CREATE TABLE admin_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES admins(id),
    action VARCHAR(50) NOT NULL,
    target_table VARCHAR(100) NOT NULL,
    target_id VARCHAR(255),
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 기존 reservations 테이블에 컬럼 추가
ALTER TABLE reservations 
ADD COLUMN driver_id UUID REFERENCES drivers(id),
ADD COLUMN accommodation_id UUID REFERENCES accommodations(id),
ADD COLUMN admin_notes TEXT,
ADD COLUMN customer_notes TEXT,
ADD COLUMN qr_code VARCHAR(255);

-- 인덱스 생성
CREATE INDEX idx_admins_email ON admins(email);
CREATE INDEX idx_admins_role ON admins(role);
CREATE INDEX idx_drivers_email ON drivers(email);
CREATE INDEX idx_drivers_is_available ON drivers(is_available);
CREATE INDEX idx_accommodations_coordinates ON accommodations(latitude, longitude);
CREATE INDEX idx_competitor_prices_competitor ON competitor_prices(competitor_name);
CREATE INDEX idx_competitor_prices_region ON competitor_prices(region);
CREATE INDEX idx_inquiries_user_id ON inquiries(user_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_settlements_reservation_id ON settlements(reservation_id);
CREATE INDEX idx_settlements_driver_id ON settlements(driver_id);
CREATE INDEX idx_settlements_is_processed ON settlements(is_processed);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_admin_logs_created_at ON admin_logs(created_at);
CREATE INDEX idx_reservations_driver_id ON reservations(driver_id);
CREATE INDEX idx_reservations_accommodation_id ON reservations(accommodation_id);

-- 기본 관리자 계정 생성 (비밀번호는 실제로는 암호화되어야 함)
INSERT INTO admins (email, name, password, role) 
VALUES ('admin@carrydrop.com', '시스템 관리자', '$2a$10$example_hashed_password', 'SUPER_ADMIN'); 