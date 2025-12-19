---
page_title: f5xc_workload_flavor - f5xc-api-mcp
subcategory: Kubernetes
description: Create Workload Flavor
---

# Workload Flavor

List the set of workload_flavor in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-appstack-workload-flavor-create` | Create Workload Flavor |
| `f5xc-api-appstack-workload-flavor-get` | Get Workload Flavor |
| `f5xc-api-appstack-workload-flavor-list` | List Workload Flavor |
| `f5xc-api-appstack-workload-flavor-update` | Replace Flavor |
| `f5xc-api-appstack-workload-flavor-delete` | Delete Workload Flavor |

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

Ask Claude to help you work with Workload Flavor resources:

### Create Workload Flavor

> "Create a workload-flavor named 'example' in the 'production' namespace"

### List Workload Flavors

> "List all workload-flavors in the 'production' namespace"

### Get Workload Flavor Details

> "Get details of the workload-flavor named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create workload_flavor -n <namespace> -i workload_flavor.yaml

# Get
f5xcctl configuration get workload_flavor -n <namespace> <name>

# List
f5xcctl configuration list workload_flavor -n <namespace>

# Delete
f5xcctl configuration delete workload_flavor -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_workload_flavor" "example" {
  name      = "example-workload-flavor"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
