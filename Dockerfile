FROM node:14.21.3

WORKDIR /

COPY package.json package.json
COPOY package-lock.json package-lock.json

RUN npm install

COPY . .

CMD ["node", "run api"]
