---
page_title: f5xc_workload_flavor - f5xc-api-mcp
subcategory: Applications
description: Create Workload Flavor.
---

# Workload Flavor

List the set of workload_flavor in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-workload-flavor-create` | Create Workload Flavor. |
| `f5xc-api-applications-workload-flavor-get` | GET Workload Flavor. |
| `f5xc-api-applications-workload-flavor-list` | List Workload Flavor. |
| `f5xc-api-applications-workload-flavor-update` | Replace Flavor. |
| `f5xc-api-applications-workload-flavor-delete` | DELETE Workload Flavor. |

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
f5xcctl applications create workload_flavor -n <namespace> -i workload_flavor.yaml

# Get
f5xcctl applications get workload_flavor <name> -n <namespace>

# List
f5xcctl applications list workload_flavor -n <namespace>

# Delete
f5xcctl applications delete workload_flavor <name> -n <namespace>
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
