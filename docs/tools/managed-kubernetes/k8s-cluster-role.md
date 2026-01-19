---
page_title: f5xc_k8s_cluster_role - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Configuration Specification.
---

# K8S Cluster Role

Replacing an k8s_cluster_role object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-k8s-cluster-role-create` | Create Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-get` | GET Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-list` | List K8s Cluster Role. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-update` | Replace Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-cluster-role-delete` | DELETE K8s Cluster Role. |

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

Ask Claude to help you work with K8S Cluster Role resources:

### Create K8S Cluster Role

> "Create a k8s-cluster-role named 'example' in the 'production' namespace"

### List K8S Cluster Roles

> "List all k8s-cluster-roles in the 'production' namespace"

### Get K8S Cluster Role Details

> "Get details of the k8s-cluster-role named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_cluster_roles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_cluster_roles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_cluster_roles" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @k8s_cluster_role.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_cluster_roles/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
