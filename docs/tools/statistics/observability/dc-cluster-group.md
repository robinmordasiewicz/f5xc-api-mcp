---
page_title: f5xc_dc_cluster_group - f5xc-api-mcp
subcategory: Statistics
description: DC Cluster Topology.
---

# Dc Cluster Group

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET summary of all DC Cluster groups.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-dc-cluster-group-create` | DC Cluster Topology. |
| `f5xc-api-statistics-dc-cluster-group-list` | DC Cluster Groups Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dc_cluster_group` | DC Cluster group | `Dcg-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- dc-cluster-group

## Example Usage

Ask Claude to help you work with Dc Cluster Group resources:

### Create Dc Cluster Group

> "Create a dc-cluster-group named 'example' in the 'production' namespace"

### List Dc Cluster Groups

> "List all dc-cluster-groups in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create dc_cluster_group -n <namespace> -i dc_cluster_group.yaml

# Get
xcsh statistics get dc_cluster_group <name> -n <namespace>

# List
xcsh statistics list dc_cluster_group -n <namespace>

# Delete
xcsh statistics delete dc_cluster_group <name> -n <namespace>
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
