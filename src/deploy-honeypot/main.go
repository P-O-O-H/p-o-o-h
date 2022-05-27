package main

import (
	"bytes"
	"context"
	"flag"
	"io"
	"io/ioutil"
	"log"

	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/serializer/yaml"
	yamlutil "k8s.io/apimachinery/pkg/util/yaml"
	"k8s.io/client-go/dynamic"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/restmapper"
	//"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/rest"
	_ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
)

var (
	kubeconfig   string
	honeypotspec string
)

func main() {

	flag.StringVar(&honeypotspec, "honeypotspec", "", "")
	flag.Parse()

	honeypotpath := "/var/pots/" + honeypotspec

	config, err := rest.InClusterConfig()
	if err != nil {
		panic(err.Error())
	}

	c, err := kubernetes.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		panic(err.Error())
	}


	b, err := ioutil.ReadFile(honeypotpath)
	if err != nil {
		log.Fatal(err)
	}

	decoder := yamlutil.NewYAMLOrJSONDecoder(bytes.NewReader(b), 100)
	for {
		var rawObj runtime.RawExtension
		if err = decoder.Decode(&rawObj); err != nil {
			break
		}

		obj, gvk, err := yaml.NewDecodingSerializer(unstructured.UnstructuredJSONScheme).Decode(rawObj.Raw, nil, nil)
		unstructuredMap, err := runtime.DefaultUnstructuredConverter.ToUnstructured(obj)
		if err != nil {
			panic(err.Error())
		}

		unstructuredObj := &unstructured.Unstructured{Object: unstructuredMap}

		gr, err := restmapper.GetAPIGroupResources(c.Discovery())
		if err != nil {
			panic(err.Error())
		}

		mapper := restmapper.NewDiscoveryRESTMapper(gr)
		mapping, err := mapper.RESTMapping(gvk.GroupKind(), gvk.Version)
		if err != nil {
			panic(err.Error())
		}

		var dri dynamic.ResourceInterface
		if mapping.Scope.Name() == meta.RESTScopeNameNamespace {
			if unstructuredObj.GetNamespace() == "" {
				unstructuredObj.SetNamespace("default")
			}
			dri = clientset.Resource(mapping.Resource).Namespace(unstructuredObj.GetNamespace())
		} else {
			dri = clientset.Resource(mapping.Resource)
		}

		if _, err := dri.Create(context.Background(), unstructuredObj, metav1.CreateOptions{}); err != nil {
			panic(err.Error())
		}
	}
	if err != io.EOF {
		log.Fatal("eof ", err)
	}
}