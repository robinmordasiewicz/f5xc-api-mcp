---
page_title: f5xc_k8s_pod_security_policy - f5xc-api-mcp
subcategory: Kubernetes
description: Create Configuration Specification
---

# K8S Pod Security Policy

Replacing an k8s_pod_security_policy object will update the object by replacing the existing spec
with the provided one.
For read-then-write operations a resourceVersion mismatch will occur if the
object was modified between the read and write

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-k8s-pod-security-policy-create` | Create Configuration Specification |
| `f5xc-api-core-k8s-pod-security-policy-get` | Get Configuration Specification |
| `f5xc-api-core-k8s-pod-security-policy-list` | List K8s Pod Security Policy |
| `f5xc-api-core-k8s-pod-security-policy-update` | Replace Configuration Specification |
| `f5xc-api-core-k8s-pod-security-policy-delete` | Delete K8s Pod Security Policy |

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

Ask Claude to help you work with K8S Pod Security Policy resources:

### Create K8S Pod Security Policy

> "Create a k8s-pod-security-policy named 'example' in the 'production' namespace"

### List K8S Pod Security Policys

> "List all k8s-pod-security-policys in the 'production' namespace"

### Get K8S Pod Security Policy Details

> "Get details of the k8s-pod-security-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f k8s_pod_security_policy.yaml

# Get
f5xcctl get k8s_pod_security_policy {name} -n {namespace}

# List
f5xcctl get k8s_pod_security_policys -n {namespace}

# Delete
f5xcctl delete k8s_pod_security_policy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_k8s_pod_security_policy" "example" {
  name      = "example-k8s-pod-security-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
