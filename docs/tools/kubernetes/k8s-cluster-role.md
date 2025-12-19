---
page_title: f5xc_k8s_cluster_role - f5xc-api-mcp
subcategory: Kubernetes
description: Create Configuration Specification
---

# K8S Cluster Role

Replacing an k8s_cluster_role object will update the object by replacing the existing spec with the
provided one.
For read-then-write operations a resourceVersion mismatch will occur if the object was
modified between the read and write

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-k8s-cluster-role-create` | Create Configuration Specification |
| `f5xc-api-appstack-k8s-cluster-role-get` | Get Configuration Specification |
| `f5xc-api-appstack-k8s-cluster-role-list` | List K8s Cluster Role |
| `f5xc-api-appstack-k8s-cluster-role-update` | Replace Configuration Specification |
| `f5xc-api-appstack-k8s-cluster-role-delete` | Delete K8s Cluster Role |

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

Ask Claude to help you work with K8S Cluster Role resources:

### Create K8S Cluster Role

> "Create a k8s-cluster-role named 'example' in the 'production' namespace"

### List K8S Cluster Roles

> "List all k8s-cluster-roles in the 'production' namespace"

### Get K8S Cluster Role Details

> "Get details of the k8s-cluster-role named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create k8s_cluster_role -n <namespace> -i k8s_cluster_role.yaml

# Get
f5xcctl configuration get k8s_cluster_role -n <namespace> <name>

# List
f5xcctl configuration list k8s_cluster_role -n <namespace>

# Delete
f5xcctl configuration delete k8s_cluster_role -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_k8s_cluster_role" "example" {
  name      = "example-k8s-cluster-role"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
