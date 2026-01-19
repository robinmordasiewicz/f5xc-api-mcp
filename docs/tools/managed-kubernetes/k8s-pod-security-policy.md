---
page_title: f5xc_k8s_pod_security_policy - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Configuration Specification.
---

# K8S Pod Security Policy

Replacing an k8s_pod_security_policy object will update the object by replacing the existing spec
with the provided one.
For read-then-write operations a resourceVersion mismatch will occur if the
object was modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-create` | Create Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-get` | GET Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-list` | List K8s Pod Security Policy. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-update` | Replace Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-policy-delete` | DELETE K8s Pod Security Policy. |

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

Ask Claude to help you work with K8S Pod Security Policy resources:

### Create K8S Pod Security Policy

> "Create a k8s-pod-security-policy named 'example' in the 'production' namespace"

### List K8S Pod Security Policys

> "List all k8s-pod-security-policys in the 'production' namespace"

### Get K8S Pod Security Policy Details

> "Get details of the k8s-pod-security-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @k8s_pod_security_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
