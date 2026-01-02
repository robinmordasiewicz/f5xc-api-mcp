---
page_title: f5xc_workload_flavor - f5xc-api-mcp
subcategory: Container Services
description: Create Workload Flavor.
---

# Workload Flavor

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of workload_flavor in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-containerservices-workload-flavor-create` | Create Workload Flavor. |
| `f5xc-api-containerservices-workload-flavor-get` | GET Workload Flavor. |
| `f5xc-api-containerservices-workload-flavor-list` | List Workload Flavor. |
| `f5xc-api-containerservices-workload-flavor-update` | Replace Flavor. |
| `f5xc-api-containerservices-workload-flavor-delete` | DELETE Workload Flavor. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- workload-flavor

**Modifies:**

- workload-flavor

**Deletes:**

- workload-flavor
- contained_resources

## Example Usage

Ask Claude to help you work with Workload Flavor resources:

### Create Workload Flavor

> "Create a workload-flavor named 'example' in the 'production' namespace"

### List Workload Flavors

> "List all workload-flavors in the 'production' namespace"

### Get Workload Flavor Details

> "Get details of the workload-flavor named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh container_services create workload_flavor -n <namespace> -i workload_flavor.yaml

# Get
xcsh container_services get workload_flavor <name> -n <namespace>

# List
xcsh container_services list workload_flavor -n <namespace>

# Delete
xcsh container_services delete workload_flavor <name> -n <namespace>
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
