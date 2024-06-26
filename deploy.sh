#!/bin/bash

set -e

ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" \
      "cat key.json | sudo docker login -u ${REGISTRY_USER} --password-stdin ${CI_REGISTRY} &&
       sudo docker-compose pull library-ui && sudo docker stop library-ui &&
       sudo docker-compose -f docker-compose.yaml --env-file .env up -d --build library-ui"