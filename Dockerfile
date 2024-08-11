FROM node:18-alpine
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY docker-entrypoint.sh /

RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/bin/sh", "/docker-entrypoint.sh" ]

#CMD ["npm", "run",  "start"]