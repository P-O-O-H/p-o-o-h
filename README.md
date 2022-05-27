# Percieving Outsider Operations with Honeypots

The official repository for Percieving Outsider Operations with Honeypots.

### What is this?
This is a system that dynamically deploys honeypots using kubernetes clusters within cloud infrastructure. Our deployment creates a simple and intuitive design in order to dynamically deploy and monitor your honeypots. Below, we will explain how this can be deployed on your network.

### Installation
Follow the steps defined in the [kubernetes deployment instructions](https://github.com/P-O-O-H/p-o-o-h/tree/main/helm) in order to install in your cloud infrastructure. Keep in mind that your cloud infrastructure should be allow connections from browsers in order to access the management web app. This should only be accessable internally as external access would present a security risk.

### Components
- Kubernetes cluster
- Web application built using Node.js
- Prebuilt docker images for use as Honeypots

