# 캐리드롭 (CarryDrop) - Same-day Luggage Delivery Service

짐은 맡기고, 쉼을 즐기다. CarryDrop은 일본 내 공항 ↔ 호텔/숙소 간 당일 수하물 배송 서비스입니다.

## Tech Stack

-   **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS, i18next
-   **Backend**: Kotlin 1.9, Spring Boot 3.2, Spring MVC, Spring Security (JWT)
-   **ORM**: JPA (Hibernate), Flyway migrations
-   **Database**: Neon PostgreSQL 15
-   **Authentication**: OAuth2 (Google, Apple, Kakao) via JWT (HttpOnly Cookies)
-   **Payments**: Stripe
-   **CI/CD**: GitHub Actions (Docker build), Docker Compose

## Project Structure

```
.
├── backend/      # Spring Boot API (Kotlin)
│   ├── src/
│   ├── build.gradle.kts
│   └── Dockerfile
├── frontend/     # Next.js Web App (TypeScript)
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── .env.example  # Environment variable template
├── docker-compose.yml
└── nginx.conf      # Nginx reverse proxy configuration
```

## Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd carry-drop
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    cd frontend
    pnpm install # 또는 npm install
    cd ..
    ```

3.  **Setup Backend:**
    -   The backend is a Gradle project. Ensure you have JDK 17 installed.
    -   The Gradle wrapper (`./gradlew`) will download the required Gradle version.

4.  **Environment Variables:**
    -   Copy `.env.example` to `.env` in the project root: `cp .env.example .env`
    -   Fill in the required values in `.env`, especially:
        -   `DATABASE_URL` (Your Neon PostgreSQL connection string)
        -   `JWT_SECRET` (A strong random string)
        -   `STRIPE_API_KEY` (Your Stripe test secret key)
        -   OAuth2 client credentials for Google, Kakao, Apple.

5.  **Run Backend (Development Mode):**
    -   You can run the Spring Boot application directly from your IDE (e.g., IntelliJ IDEA).
    -   Or, using Gradle:
        ```bash
        cd backend
        ./gradlew bootRun
        ```
    -   The backend API will be available at `http://localhost:8080`.

6.  **Run Frontend (Development Mode):**
    ```bash
    cd frontend
    pnpm dev # 또는 npm run dev
    ```
    -   The frontendNext.js app will be available at `http://localhost:3000`.
    -   It will try to connect to the backend API (ensure `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.development.local` or similar points to `http://localhost:8080/api` if not using Nginx locally).

## Production Build & Run (Docker)

1.  **Ensure `.env` is configured** with production values.

2.  **Build Backend JAR:**
    ```bash
    cd backend
    ./gradlew bootJar # 또는 ./gradlew build (이 과정에서 test가 실행될 수 있음)
    cd ..
    ```

3.  **Build and Run Docker Containers:**
    ```bash
    docker-compose up --build -d
    ```
    -   This will build images for frontend, api, and run nginx.
    -   The service will be accessible via Nginx at `http://localhost` (or your server's IP/domain).

4.  **Stop Docker Containers:**
    ```bash
    docker-compose down
    ```

## Database Migrations (Flyway)

-   Flyway migrations are located in `backend/src/main/resources/db/migration`.
-   Migrations run automatically when the Spring Boot application starts.
-   To create a new migration, add a SQL file like `V2__Description.sql` to the directory.

## API Documentation

-   (If using Swagger/OpenAPI) API docs available at `/swagger-ui.html` or `/v3/api-docs`.

---
*This project was scaffolded and partially developed by an AI Pair Programmer.*
