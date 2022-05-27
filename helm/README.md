# Honeypot Deployment Documentation

### Prerequisite tools:
- [GCloud CLI](https://cloud.google.com/sdk/docs/install)
- [KubeCTL](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Helm](https://helm.sh/docs/intro/install/)


### Preparing the cluster

1. Visit [GCP](https://console.cloud.google.com). If available, activate your free $300 in GCP credits to deploy the project. Further credits can be purchased in the future to maintain the cluster.

2. Enable the Kubernetes Engine API

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

8. Enable Workload Identity at the cluster level and then the node level
	
	```
	$ gcloud container clusters update CLUSTER_NAME \
	    --zone=COMPUTE_ZONE \
	    --workload-pool=PROJECT_ID.svc.id.goog
	```

	```
	$ gcloud container node-pools update default-pool \
    	--cluster=CLUSTER_NAME \
    	--workload-metadata=GKE_METADATA
	```

	This will allow us to use service accounts that interact with both GCP and Kubernetes.


### Installing honeypot deployment system

Before we can start deploying honeypots, we must bind the service account used by the cluster to a service account for GCP. Once these accounts are bound to each other, we will be able to deploy honeypots.

1. Navigate to service accounts in IAM and create service account.

2. Fill out service account values as desired.

3. Assign the service account the Kubernetes Engine Admin role with no condition.

4. Grant administrators access to this account as needed.

	Resulting values:
	- GCP_SVC_ACCT_NAME
	- GCP_SVC_ACCT_EMAIL


We will now need to configure our `values.yaml` so that it has all of the correct values for deployment. CONTINUE HERE

Installing the management environment is now very simple. Once you have configured your values for deployment (a sample is given [here](./values.yaml.sample)), choose an installment name and run the following:

	`$ helm install HELM_INSTALL_NAME .`

We will now bind the GCP service account to the Kubernetes service account.
	
	```
	gcloud iam service-accounts add-iam-policy-binding GCP_SVC_ACCT_EMAIL \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:PROJECT_ID.svc.id.goog[managment/webserver]"
	```

Our webserver is now able to deploy honeypots to the network!


This will deploy the honeypot management network. Use the commands provided after execution to locate the external address where services can be accessed.