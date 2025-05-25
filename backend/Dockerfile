# backend/Dockerfile
FROM amazoncorretto:17-alpine-jdk
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
# DATABASE_URL 등의 환경 변수는 docker-compose.yml에서 주입 