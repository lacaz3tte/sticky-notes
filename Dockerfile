FROM node:18-alpine

WORKDIR /app

# Устанавливаем зависимости для сборки native модулей и netcat для проверки подключения
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    postgresql-client \
    netcat-openbsd

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Открываем порт
EXPOSE 3000

# Команда запуска
CMD ["npm", "run", "dev"]