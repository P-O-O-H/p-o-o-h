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

Before we can deploy honeypots, we must allocate service accounts for our cluster. This will allow processes like FluentD and our management console act on other resources within our cluster. We will be creating two for the aforementioned processes.


1. Navigate to service accounts in IAM and create service account.

2. Fill out service account values as desired.

3. For FluentD, grant a role of `Kubernetes Engine Cluster Viewer`. For the management console, grant a role of `Kubernetes Engine Admin`.

4. Grant administrators access to these accounts as needed.

    Resulting values:
	- MANAGEMENT_SVC_ACCT_EMAIL
	- FLUENTD_SVC_ACCT_EMAIL

We will now bind the GCP service accounts to the Kubernetes service accounts.
	
	```
	gcloud iam service-accounts add-iam-policy-binding {MANAGEMENT|FLUENTD}_SVC_ACCT_EMAIL \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:PROJECT_ID.svc.id.goog[managment/webserver]"
	```

We will now need to configure our `values.yaml` so that it has all of the correct values for deployment (sample [here](./values.yaml.sample)). All provided values are appropriate, however, we are missing one: `webserverGcpSvcAccount`. Set this to `MANAGEMENT_SVC_ACCT_EMAIL`.

Installing the management environment is now very simple. Ensure that you have navigated to the [helm/](.) directory and execute:

	`$ helm install HELM_INSTALL_NAME .`

Our webserver is now able to deploy honeypots to Kubernetes!

The commands provided by the output of this command will direct you to where you can access the management interface.