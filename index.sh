#!/bin/bash

DEPLOYMENT_DIR='./infra/k8s/deployments'
SERVICE_DIR='./infra/k8s/services'
VOLUME_DIR='./infra/k8s/volumes'


# Create volumes and claims
kubectl apply -f "$VOLUME_DIR/mongodb-pv.yml"
kubectl apply -f "$VOLUME_DIR/mongodb-pvc.yml"

kubectl apply -f "$VOLUME_DIR/persistent-volume.yml"
kubectl apply -f "$VOLUME_DIR/persistent-volume-claim.yml"

kubectl apply -f "$DEPLOYMENT_DIR/auth-depl.yml"
kubectl apply -f "$DEPLOYMENT_DIR/mongodb-depl.yml"
kubectl apply -f "$DEPLOYMENT_DIR/orders-process-depl.yml"
kubectl apply -f "$DEPLOYMENT_DIR/posts-depl.yml"
kubectl apply -f "$DEPLOYMENT_DIR/rabbitmq-depl.yml"
kubectl apply -f "$DEPLOYMENT_DIR/react-app-depl.yml"

kubectl apply -f "$SERVICE_DIR/auth-srv.yml"
kubectl apply -f "$SERVICE_DIR/ingress-srv.yml"
kubectl apply -f "$SERVICE_DIR/mongodb-srv.yml"
kubectl apply -f "$SERVICE_DIR/orders-process-srv.yml"
kubectl apply -f "$SERVICE_DIR/posts-srv.yml"
kubectl apply -f "$SERVICE_DIR/rabbitmq-srv.yml"
kubectl apply -f "$SERVICE_DIR/react-app-srv.yml"


# Create elasticsearch 

kubectl create -f https://download.elastic.co/downloads/eck/2.3.0/crds.yaml
kubectl apply -f https://download.elastic.co/downloads/eck/2.3.0/operator.yaml
kubectl apply -f "$DEPLOYMENT_DIR/elastic-search.yml"
