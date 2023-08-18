#!/bin/bash

docker build -t ershubhamgupta1/posts:0.1.2 .
docker push ershubhamgupta1/posts:0.1.2
kubectl delete -f ../../infra/k8s/deployments/posts-depl.yml
kubectl create -f ../../infra/k8s/deployments/posts-depl.yml



