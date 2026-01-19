---
page_title: f5xc_k8s_cluster - f5xc-api-mcp
subcategory: Sites
description: Create Configuration Specification.
---

# K8S Cluster

Replacing an k8s_cluster object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-k8s-cluster-create` | Create Configuration Specification. |
| `f5xc-api-sites-k8s-cluster-get` | GET Configuration Specification. |
| `f5xc-api-sites-k8s-cluster-list` | List K8s Cluster. |
| `f5xc-api-sites-k8s-cluster-update` | Replace Configuration Specification. |
| `f5xc-api-sites-k8s-cluster-delete` | DELETE K8s Cluster. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with K8S Cluster resources:

### Create K8S Cluster

> "Create a k8s-cluster named 'example' in the 'production' namespace"

### List K8S Clusters

> "List all k8s-clusters in the 'production' namespace"

### Get K8S Cluster Details

> "Get details of the k8s-cluster named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_clusters" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_clusters/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_clusters" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @k8s_cluster.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_clusters/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
