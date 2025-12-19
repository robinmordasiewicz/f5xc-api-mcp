---
page_title: f5xc_dc_cluster_group - f5xc-api-mcp
subcategory: Kubernetes
description: Create DC Cluster Group
---

# Dc Cluster Group

Replace given DC Cluster Group in given namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dc-cluster-group-create` | Create DC Cluster Group |
| `f5xc-api-core-dc-cluster-group-get` | Get DC Cluster Group |
| `f5xc-api-core-dc-cluster-group-list` | List DC Cluster Group |
| `f5xc-api-core-dc-cluster-group-update` | Replace DC Cluster Group |
| `f5xc-api-core-dc-cluster-group-delete` | Delete DC Cluster Group |

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
f5xcctl apply -f dc_cluster_group.yaml

# Get
f5xcctl get dc_cluster_group {name} -n {namespace}

# List
f5xcctl get dc_cluster_groups -n {namespace}

# Delete
f5xcctl delete dc_cluster_group {name} -n {namespace}
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
