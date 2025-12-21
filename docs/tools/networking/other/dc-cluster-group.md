---
page_title: f5xc_dc_cluster_group - f5xc-api-mcp
subcategory: Networking
description: Create DC Cluster Group.
---

# Dc Cluster Group

Replace given DC Cluster Group in given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-dc-cluster-group-create` | Create DC Cluster Group. |
| `f5xc-api-networking-dc-cluster-group-get` | GET DC Cluster Group. |
| `f5xc-api-networking-dc-cluster-group-list` | List DC Cluster Group. |
| `f5xc-api-networking-dc-cluster-group-update` | Replace DC Cluster Group. |
| `f5xc-api-networking-dc-cluster-group-delete` | DELETE DC Cluster Group. |

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

Ask Claude to help you work with Dc Cluster Group resources:

### Create Dc Cluster Group

> "Create a dc-cluster-group named 'example' in the 'production' namespace"

### List Dc Cluster Groups

> "List all dc-cluster-groups in the 'production' namespace"

### Get Dc Cluster Group Details

> "Get details of the dc-cluster-group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create dc_cluster_group -n <namespace> -i dc_cluster_group.yaml

# Get
f5xcctl networking get dc_cluster_group <name> -n <namespace>

# List
f5xcctl networking list dc_cluster_group -n <namespace>

# Delete
f5xcctl networking delete dc_cluster_group <name> -n <namespace>
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
