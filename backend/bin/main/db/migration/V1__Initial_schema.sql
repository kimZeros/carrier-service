-- backend/src/main/resources/db/migration/V1__Initial_schema.sql

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    role VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE reservations (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    from_place VARCHAR(255) NOT NULL,
    to_place VARCHAR(255) NOT NULL,
    pick_up_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    drop_off_time TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    price INTEGER NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT fk_reservations_user_id FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE -- User 삭제 시 Reservation도 삭제
);

-- 인덱스 추가 (선택 사항이지만 성능에 도움)
CREATE INDEX idx_reservations_user_id ON reservations (user_id);
CREATE INDEX idx_reservations_pick_up_time ON reservations (pick_up_time);
CREATE INDEX idx_reservations_status ON reservations (status); 