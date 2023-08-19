

<p align="center">
    <a href="https://kubernetes.io" alt="Kubernetes">
        <img src="https://img.shields.io/badge/Kubernetes-1.18-blue" /></a>
    <a href="https://minikube.sigs.k8s.io/docs" alt="minikube">
        <img src="https://img.shields.io/badge/minikube-v1.31.1-black" /></a>
    <a href="https://podman.io" alt="podman">
        <img src="https://img.shields.io/badge/podman-4.6.0-purple" /></a>
    <a href="https://podman.io" alt="mit">
        <img src="https://img.shields.io/badge/License-MIT-green" /></a>

</p>

<h2>Description</h2>

This project is about running the application in microservice architecture. We have multiple nodejs application running as microservices. Also we have integrated the mongodb, rabbitmq, elasticsearch as service. This project has been tried & tested on Mac but it should work on all the platforms.
    
##############################

<h2> 🚀 ## Getting Started</h2>

1) Install Vs code
2) Install brew : https://brew.sh/ ( when you run the command then next instructions will be in the terminal output, so don’t forget to check the output of the command) 
3) install minikube by running: brew install minikube
4) install podman by running : brew install podman
5) initialize podman :  podman machine init --cpus 2 --memory 8196 --rootful
6) start podman : podman machine start
7) Start minikube : minikube start --kubernetes-version=v1.27.3 --driver=podman --container-runtime=cri-o --force-systemd —feature-gates="LocalStorageCapacityIsolation=false" --memory 7196
8) run ./index.sh
9) get url of minikube to access the k8 microservice from browser: minikube service posts-srv --url 
10) To see all the pods, containers etc run : minikube dashboard

####################################
####################################

<h3> Access Elasticsearch </h3>

Open terminal and run following three commands 

Solution 1) Using Nodeport service of elasticsearch
    syntax: minikube service service_name


access elasticsearch from browser: http://127.0.0.1:59451 ( username: elastic)

Solution 2) Using kubectl port forwarding
1) PASSWORD=$(kubectl get secret elasticsearch-sample-es-elastic-user -o=jsonpath='{.data.elastic}' | base64 --decode)
2) echo $PASSWORD
3) kubectl port-forward service/elasticsearch-sample-es-http 3002:9200 

access elasticsearch using from browser: https://localhost:3002/ ( username: elastic)
access elasticsearch using curl

  1) create index: curl -u "elastic:$PASSWORD" -k -X PUT "https://localhost:3002/shubham-log-index?pretty"
  2) see index: curl -u "elastic:$PASSWORD" -k "https://localhost:3002/_cat/indices?v"


####################################
####################################

<h3>Access posts microservice</h3>

Run the following command to access 'post' microservice related  backend APIs from browser: minikube service posts-srv --url
for an example the api to create post is : BaseUrl/posts/create-posts (base url you can get from running the above command)

All the APIs related to post microservice are available on : k8-MERN-App/microservices/node-posts/index.js

####################################
####################################

<h3>Access auth microservice</h3>

Run the following command to access 'auth' microservice related backend APIs from browser: minikube service auth-srv --url
for an example the api to login is : BaseUrl/auth/login (base url you can get from running the above command)

All the APIs related to post microservice are available on : k8-MERN-App/microservices/node-auth/index.js

####################################
####################################

<h3>Features</h3>

1) Nodejs microservices.
2) Access elasticsearch from browser.
3) Access mongodb from nodejs microservice.
4) Access rabbitmq from nodejs microservice.
5) Communication b/w microservices.
6) Running rabbitmq and mongodb as microservice.
   


<h2> 🚀 &nbsp;Some Tools I Have Used and Learned</h2>
<p align="left">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="vscode" width="45" height="45"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"  alt="kubernetes" width="45" height="45"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg"  alt="nodejs" width="45" height="45"/>
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="45" height="45"/>
</p>

