FROM node:18.18-alpine 
WORKDIR /EduPlatform
COPY package.json . 
RUN npm install 
COPY . . 
CMD npm start