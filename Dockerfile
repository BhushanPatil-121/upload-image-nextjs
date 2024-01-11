FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install 
COPY . .
EXPOSE 3000
RUN npx prisma generate

CMD ["npm", "run", "dev"]
