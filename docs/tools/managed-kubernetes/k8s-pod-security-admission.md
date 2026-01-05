---
page_title: f5xc_k8s_pod_security_admission - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Configuration Specification.
---

# K8S Pod Security Admission

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replacing an k8s_pod_security_admission object will update the object by replacing the existing spec
with the provided one.
For read-then-write operations a resourceVersion mismatch will occur if the
object was modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-k8s-pod-security-admission-create` | Create Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-admission-get` | GET Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-admission-list` | List K8s Pod Security Admission. |
| `f5xc-api-managedkubernetes-k8s-pod-security-admission-update` | Replace Configuration Specification. |
| `f5xc-api-managedkubernetes-k8s-pod-security-admission-delete` | DELETE K8s Pod Security Admission. |

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

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- k8s-pod-security-admission

**Modifies:**

- k8s-pod-security-admission

**Deletes:**

- k8s-pod-security-admission
- contained_resources

## Example Usage

Ask Claude to help you work with K8S Pod Security Admission resources:

### Create K8S Pod Security Admission

> "Create a k8s-pod-security-admission named 'example' in the 'production' namespace"

### List K8S Pod Security Admissions

> "List all k8s-pod-security-admissions in the 'production' namespace"

### Get K8S Pod Security Admission Details

> "Get details of the k8s-pod-security-admission named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_admissions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_admissions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_admissions" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @k8s_pod_security_admission.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/k8s_pod_security_admissions/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
