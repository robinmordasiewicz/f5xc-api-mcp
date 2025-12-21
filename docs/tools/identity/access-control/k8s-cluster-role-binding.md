---
page_title: f5xc_k8s_cluster_role_binding - f5xc-api-mcp
subcategory: Identity
description: Create Configuration Specification.
---

# K8S Cluster Role Binding

Replacing an k8s_cluster_role_binding object will update the object by replacing the existing spec
with the provided one.
For read-then-write operations a resourceVersion mismatch will occur if the
object was modified between the read and write.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-k8s-cluster-role-binding-create` | Create Configuration Specification. |
| `f5xc-api-identity-k8s-cluster-role-binding-get` | GET Configuration Specification. |
| `f5xc-api-identity-k8s-cluster-role-binding-list` | List K8s Cluster Role Binding. |
| `f5xc-api-identity-k8s-cluster-role-binding-update` | Replace Configuration Specification. |
| `f5xc-api-identity-k8s-cluster-role-binding-delete` | DELETE K8s Cluster Role Binding. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with K8S Cluster Role Binding resources:

### Create K8S Cluster Role Binding

> "Create a k8s-cluster-role-binding named 'example' in the 'production' namespace"

### List K8S Cluster Role Bindings

> "List all k8s-cluster-role-bindings in the 'production' namespace"

### Get K8S Cluster Role Binding Details

> "Get details of the k8s-cluster-role-binding named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create k8s_cluster_role_binding -n <namespace> -i k8s_cluster_role_binding.yaml

# Get
f5xcctl configuration get k8s_cluster_role_binding -n <namespace> <name>

# List
f5xcctl configuration list k8s_cluster_role_binding -n <namespace>

# Delete
f5xcctl configuration delete k8s_cluster_role_binding -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_k8s_cluster_role_binding" "example" {
  name      = "example-k8s-cluster-role-binding"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
