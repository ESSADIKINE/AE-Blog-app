# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
COPY --from=frontend /app/dist ./frontend/dist
EXPOSE 3001
CMD ["node", "index.js"]