# ApiServer

## 프로젝트 목표
APIServer repository에서의 프로젝트 목표는 개발환경 별 Test, Deploy 과정에서 어디에 더 중점적으로 다루냐에 따라 Dev 환경과 Staging, Production 환경에서의 아키텍처를 목적에 맞게 설계하였습니다. 개발자들의 입장에서 컨테이너 내부 디버깅을 위한 환경 구축을 위해 EC2 클러스터 기반으로 돌아가도록 구성하였으며, Staging, Production의 경우 Auto Scailing과정에 있어 무중단배포가 가능하도록 구성하였습니다.
## SA(시스템 아키텍처)
**Staging & Production**
![SA](https://user-images.githubusercontent.com/98368480/171770556-5b26ca61-7e0b-4962-8baa-eba9b9ceb7de.png)

**Development**
![Dev](https://user-images.githubusercontent.com/98368480/171770594-4a76ce04-92f8-403d-9623-08a256c49845.png)

## DA(배포파이프라인 아키텍처)
![백엔드, 2022-06-02 23-52-32](https://user-images.githubusercontent.com/98368480/171771214-2d9a5570-153a-4e45-b1c1-68f21cf58f54.png)

## 사전준비
ECS-CLI, docker, kubernetes, git actions, argo cd, EKS

https://mtou.tistory.com/132
https://intrepidgeeks.com/tutorial/configure-argo-cd-in-amazon-eks
## 개발환경
Node 16, fastify, package.json,  
