---
page_title: f5xc_dc_cluster_group - f5xc-api-mcp
subcategory: Observability
description: DC Cluster Topology.
---

# Dc Cluster Group

GET summary of all DC Cluster groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-dc-cluster-group-create` | DC Cluster Topology. |
| `f5xc-api-observability-dc-cluster-group-list` | DC Cluster Groups Summary. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dc_cluster_group` | DC Cluster group |

## Example Usage

Ask Claude to help you work with Dc Cluster Group resources:

### Create Dc Cluster Group

> "Create a dc-cluster-group named 'example' in the 'production' namespace"

### List Dc Cluster Groups

> "List all dc-cluster-groups in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create dc_cluster_group -n <namespace> -i dc_cluster_group.yaml

# Get
f5xcctl observability get dc_cluster_group <name> -n <namespace>

# List
f5xcctl observability list dc_cluster_group -n <namespace>

# Delete
f5xcctl observability delete dc_cluster_group <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dc_cluster_group" "example" {
  name      = "example-dc-cluster-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
