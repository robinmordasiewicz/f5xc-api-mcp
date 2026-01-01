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
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
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

## xcsh Equivalent

```bash
# Create/Update
xcsh managed_kubernetes create k8s_pod_security_admission -n <namespace> -i k8s_pod_security_admission.yaml

# Get
xcsh managed_kubernetes get k8s_pod_security_admission <name> -n <namespace>

# List
xcsh managed_kubernetes list k8s_pod_security_admission -n <namespace>

# Delete
xcsh managed_kubernetes delete k8s_pod_security_admission <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_k8s_pod_security_admission" "example" {
  name      = "example-k8s-pod-security-admission"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
