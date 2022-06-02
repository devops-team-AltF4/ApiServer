FROM node:16-alpine

ARG RDS_USERNAME_STAG
ENV RDS_USERNAME_STAG=${RDS_USERNAME_STAG}

ARG RDS_PASSWORD_STAG
ENV RDS_PASSWORD_STAG=${RDS_PASSWORD_STAG}

ARG RDS_HOSTNAME_STAG
ENV RDS_HOSTNAME_STAG=${RDS_HOSTNAME_STAG}

ARG RDS_DATABASE_STAG
ENV RDS_DATABASE_STAG=${RDS_DATABASE_STAG}

# 앱 디렉터리 생성
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


EXPOSE 80

CMD [ "npm", "run", "start" ]
