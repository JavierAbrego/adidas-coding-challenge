# adidas Coding Challenge  
## Requirements to use  
- Docker
- Node (v12)
- NPM

## Project dependencies  
### NestJS with express  
- NestJS by design, throught the use of design patters help to achieve scalabality in terms of code base growth.
- It provides seamless integration with some required features like security integration or validations.
- Easy to organize the code and split features into logical reusable units through the use of modules.
- Services and dependencies that can be injected into controllers
- Routing and controllers are created easily through the use of decorators

### Cassandra  
- Cassandra is the choosen database for persistence. Capable of providing High availability by design. 
- It scales horizontally, and we can efficiently achieve low latency and high throughput

### Passportjs  
We are using passportjs and the api key strategy for authenticating the non public service.

### Jest  
Jest is used as the testing framework

### Swagger  
Swagger is used for documenting the API, it's used in email-service and exposed via. It could be used in the other services in the same way.
```
http://localhost:3001/api
```

## Folder structure  
.  
├── email-service (service responsible for sending the emails)   
│   ├── src (source and unit tests)  
│   ├── test (integration tests)   
│   ├── Dockerfile   
│   └── Jenkinsfile   
├── public-service( the service that exposes the public endpoints)  
│   ├── src (source and unit tests)    
│   ├── test (integration tests)      
│   ├── Dockerfile   
│   └── Jenkinsfile   
├── subscription-service (service responsible for handling the subscriptions)  
│   ├── src (source and unit tests)    
│   ├── test (integration tests)     
│   ├── Dockerfile   
│   └── Jenkinsfile  
└── infrastructure
    ├── docker-compose.yml (runs all the infrastructure in Docker)  
    ├── k8s (folder containing the yaml files to deploy the app and its dependencies in  k8s)  
    └── cassandra.init.sh (file use by cassandra container to create the data schema)  

### Docker compose  
You can run the whole solution using docker-compose  
```
cd infrastructure  
docker-compose up -d  
```

then you can use the provided http-request.http to test the API, it can be opened with IDEA to rune very request
```
- subscription-service/http-requests.http
- public-service/http-requests.http
- email-service/http-requests.http
```
## Run in local  

You can start and instance of cassandra for local dev using the provided docker-compose
```
cd infrastructure  
docker-compose up -d cassandra
```

cd into any of the microservices projects
```
cd public-service  
```

install the dependencies via:
```
npm install
```

and run 
```
npm run start:dev
```


## CI/CD  
Every microservice folder contains its Jenkinsfile
```
- subscription-service/Jenkinsfile
- public-service/Jenkinsfile
- email-service/Jenkinsfile
```

They all have a pipeline of 5 stages
#### Prepare  
- This stage install the dependencies of package.json
#### Test  
- Run unit tests, here we could include the sonar analysis and coverage of the projects.
#### Docker  
- This step create the build via `npm run build` and create the docker images as well as push them to `dockerhub`
#### Deploy  
In this step we asume that we have a library in places named k8s that deploys passing the component name as parameter and the version.

## Deployment k8s  
The deployments are included in the `infrastructure/k8s` folder.

- There's a deployment and a service for each one of the three microservices.
- Cassandra has its own deployment and service, `memory` is set to cover the minimum requirements of a development environment. 
  
In production, we shouldn't use this approach, and we should deploy a proper cassandra cluster.

