# 🎯 Sticky Notes - Виртуальная доска для совместной работы

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-12%2B-orange)
![Express](https://img.shields.io/badge/Express-4%2B-lightgrey)
![Socket.io](https://img.shields.io/badge/Socket.io-4%2B-yellow)
![Jest](https://img.shields.io/badge/Jest-29%2B-red)
![Docker](https://img.shields.io/badge/Docker-✓-blue)

Виртуальная доска для совместной работы со стикерами в реальном времени. Полнофункциональное backend-приложение с REST API, WebSocket соединениями и продвинутыми возможностями коллаборации.

## ✨ Возможности

- ✅ **Полный CRUD** для стикеров через REST API
- 🔐 **JWT аутентификация** с защищенными роутами
- 🌐 **Real-time обновления** через WebSocket (Socket.io)
- 🏷️ **Система тегов** для организации контента
- 📊 **История изменений** всех операций
- 🎨 **Управление слоями** (z-index) стикеров
- 👥 **Совместное редактирование** в реальном времени
- 🔍 **Поиск и фильтрация** по тегам и содержимому
- 🗑️ **Мягкое удаление** с возможностью восстановления
- 📝 **Валидация данных** с Joi
- 🐳 **Docker контейнеризация**
- 🧪 **Полное тестовое покрытие**
- 🔧 **Миграции базы данных**
- 🌱 **Сидеры тестовых данных**

## 🚀 Быстрый старт

### Предварительные требования

- **Node.js** 18.0.0 или выше
- **PostgreSQL** 12 или выше
- **npm** 9 или **yarn** 1.22+
- **Docker** и **Docker Compose** (опционально)

### 1. Клонирование и установка

```bash
git clone https://github.com/lacaz3tte/sticky-notes.git

переименовать .env.example в .env

cd sticky-notes
npm install

```

### 2. Запуск миграций

```bash
npm run db:migrate
```

### 3. Запуск сидеров

```bash
npm run seed
```

### 4. Запуск приложения

```bash
npm run dev
```

### 5. Запуск через Docker 

```bash
docker-compose up -d
```







