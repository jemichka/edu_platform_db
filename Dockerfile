FROM node:18.18-alpine

WORKDIR /EduPlatform

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

CMD ["npm", "start"]
