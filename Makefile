.PHONY: install
install:
	npm install # npm i

.PHONY: start
start: 
	NODE_OPTIONS=--openssl-legacy-provider npm start

.PHONY: run
run: 
	docker compose up -d --build

.PHONY: stop
stop:
	docker compose  stop

.PHONY: down
down:
	docker compose down


.PHONY: image-build
image-build:
	docker build -t astdockerid1/library-ui:v1.0 --build-arg API_ORIGIN=http://localhost .

.PHONY: image-push
image-push:
	docker push astdockerid1/library-ui:v1.0


HELM=helm/library-ui
NAMESPACE=default
MY_RELEASE=rsoi-ui

.PHONY: helm-run
helm-run:
	helm upgrade ${MY_RELEASE}-app ${HELM} -f ${HELM}/values.yaml \
		--install \
		--namespace ${NAMESPACE} \
        --create-namespace \
        --atomic \
        --timeout 120s \
        --debug

.PHONY: helm-template
helm-template:
	helm template ${MY_RELEASE} ${HELM} --debug