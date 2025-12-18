---
page_title: f5xc_k8s_pod_security_admission - f5xc-api-mcp
subcategory: Kubernetes
description: Create Configuration Specification
---

# K8S Pod Security Admission

Replacing an k8s_pod_security_admission object will update the object by replacing the existing spec
with the provided one.
For read-then-write operations a resourceVersion mismatch will occur if the
object was modified between the read and write

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-k8s-pod-security-admission-create` | Create Configuration Specification |
| `f5xc-api-core-k8s-pod-security-admission-get` | Get Configuration Specification |
| `f5xc-api-core-k8s-pod-security-admission-list` | List K8s Pod Security Admission |
| `f5xc-api-core-k8s-pod-security-admission-update` | Replace Configuration Specification |
| `f5xc-api-core-k8s-pod-security-admission-delete` | Delete K8s Pod Security Admission |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with K8S Pod Security Admission resources:

### Create K8S Pod Security Admission

> "Create a k8s-pod-security-admission named 'example' in the 'production' namespace"

### List K8S Pod Security Admissions

> "List all k8s-pod-security-admissions in the 'production' namespace"

### Get K8S Pod Security Admission Details

> "Get details of the k8s-pod-security-admission named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f k8s_pod_security_admission.yaml

# Get
f5xcctl get k8s_pod_security_admission {name} -n {namespace}

# List
f5xcctl get k8s_pod_security_admissions -n {namespace}

# Delete
f5xcctl delete k8s_pod_security_admission {name} -n {namespace}
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
