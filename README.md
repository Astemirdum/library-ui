# Library-UI (React)

Library-UI is a frontend in React for Library Services as backend

## The following concepts are applied in app:
- React App
- Authorization and authentication using a stateless approach (JWT)
- Running app in k8s by helm (docker-compose).
- CI (GitHub Action)
- OpenAPI (./docs.yaml)

#### K8S run app
```
    make helm-run
```

#### Docker run app
```
    make run
```

#### to run app locally
```
    npm install && make start
```