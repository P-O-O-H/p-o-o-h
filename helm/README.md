# Honeypot Deployment Documentation

### Prerequisite tools:
- [GCloud CLI](https://cloud.google.com/sdk/docs/install)
- [KubeCTL](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Helm](https://helm.sh/docs/intro/install/)


### Preparing the cluster

1. Visit [GCP](https://console.cloud.google.com). If available, activate your free $300 in GCP credits to deploy the project. Further credits can be purchased in the future to maintain the cluster.

2. Enable the Kubernetes Engine API in the navigation menu.

3. Create a new project and select it.  
	Resulting values:
	- PROJECT_NAME
	- PROJECT_ID
	
4. Authenticate to the project from the command line. Select the project with PROJECT_ID (note that if your project name is unique to GCP, PROJECT_NAME == PROJECT_ID)

	`$ gcloud init`

5. Add any project administrators from IAM & Admin with appropriate roles.

6. Create the cluster from Kubernetes Engine

	a. Select "Cluters" from left panel  
	b. Select "Create"  
	c. Choose to configure GKE Standard  
	d. Fill out basic cluster information, default values are appropriate. Feel free to change the zone as is best for you.  
	e. Create!

    Resulting values:
	- CLUSTER_NAME
	- CLUSTER_ID
	- COMPUTE_ZONE

7. Authenticate to cluster and verify you have access

	`$ gcloud container clusters get-credentials CLUSTER_NAME --zone=COMPUTE_ZONE`  
	`$ kubectl cluster-info`


### Installing honeypot deployment system

next commit...