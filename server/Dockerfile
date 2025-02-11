# Используем официальный образ Node.js
FROM node:20.12.2

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json (если используется)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Компилируем приложение NestJS
RUN npm run build

# Открываем порт приложения
EXPOSE 8000

# Запускаем приложение
CMD ["npm", "run", "start:prod"]