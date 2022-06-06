# ApiServer

## 프로젝트 목표
APIServer repository에서의 프로젝트 목표는 개발환경 별 Test, Deploy 과정에서 어디에 더 중점적으로 다루냐에 따라 Dev 환경과 Staging, Production 환경에서의 아키텍처를 목적에 맞게 설계하였습니다. 개발자들의 입장에서 컨테이너 내부 디버깅을 위한 환경 구축을 위해 EC2 클러스터 기반으로 돌아가도록 구성하였으며, Staging, Production의 경우 Auto Scailing과정에 있어 무중단배포가 가능하도록 구성하였습니다.
## SA(시스템 아키텍처)
**Staging & Production**
![image](https://user-images.githubusercontent.com/50416571/171989065-db6b82e6-b6ec-4049-8776-01c7f7e441e8.png)

**Development**
![image](https://user-images.githubusercontent.com/50416571/171989076-66ee7931-e838-4720-825d-314aa489411e.png)

## DA(배포파이프라인 아키텍처)
![백엔드, 2022-06-02 23-52-32](https://user-images.githubusercontent.com/98368480/171771214-2d9a5570-153a-4e45-b1c1-68f21cf58f54.png)

## 사전준비
ECS-CLI, docker, kubernetes, git actions, argo cd, EKS

https://mtou.tistory.com/132
https://intrepidgeeks.com/tutorial/configure-argo-cd-in-amazon-eks
## 개발환경
Node 16, fastify, package.json,  


## Install
```
npm install fastify-cli --global
```

```
fastify generate .
```

## ApiServer/plugins/mysql.js 

```

'use strict'
require('dotenv').config()

const fp = require('fastify-plugin')

module.exports = fp(async function (fastify, opts) {
  const username = process.env.RDS_USERNAME_STAG
  const password = process.env.RDS_PASSWORD_STAG
  const hostname = process.env.RDS_HOSTNAME_STAG
  const database = process.env.RDS_DATABASE_STAG

  console.log(process.env)

  fastify.register(require('@fastify/mysql'), {
    connectionString: `mysql://${username}:${password}@${hostname}/${database}`
  })
})

```

## ApiServer/routes/root.js 
```
'use strict'
const fastify = require('fastify')()

module.exports = async function (fastify, opts) {
  fastify.get('/', function (request, reply) {
    fastify.mysql.getConnection(onConnect)

    function onConnect (err, client) {
      if (err) return reply.send(err)

      client.query(
        'SELECT now()', [],                     //mysql 
        function onResult (err, result) {
          client.release()
          reply.send(err || result)
        }
      )
    }
  })
}
```

## **빌드시 주의 사항** 

Dockerfile로 빌드를 하고자 할 때는 환경변수 값을 넣어주어야 합니다. (Git action으로 build할 때 secret key로 처리가능)


```
docker build -t 도커사용자명/api-server:$IMAGE_TAG --build-arg RDS_USERNAME= RDS유저이름 --build-arg RDS_PASSWORD= RDS 비밀번호 --build-arg RDS_HOSTNAME= RDS주소 --build-arg RDS_DATABASE= 사용할 데이터베이스 . 
```

## package.json

fastify_address=0.0.0.0 으로 설정해 두어야 합니다. 
```
  "scripts": {
    "test": "tap \"test/**/*.test.js\"",
    "start": "FASTIFY_ADDRESS=0.0.0.0 fastify start -l info -p 80 app.js",
    "dev": "fastify start -w -l info -P app.js"
```

## RDS에 값 넣기

```
CREATE DATABASE project4 default CHARACTER SET UTF8;

use project4

create table example (name varchar(10), phone varchar(15), id varchar(10), city varchar(10));

select * from example;

insert into example(name, phone, id, city) values('홍길동', '010-1234-1234', '102' , '수원');

select * from example;
```
## 참조문서

fastify_address 관련

https://github.com/fastify/fastify-cli
```For containers built and run specifically by the Docker Daemon, fastify-cli is able to detect that the server process is running within a Docker container and the 0.0.0.0 listen address is set```
