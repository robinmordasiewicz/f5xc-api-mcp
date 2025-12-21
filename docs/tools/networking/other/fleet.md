---
page_title: f5xc_fleet - f5xc-api-mcp
subcategory: Networking
description: Create Fleet.
---

# Fleet

Create fleet will create a fleet object in 'system' namespace of the user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-fleet-create` | Create Fleet. |
| `f5xc-api-networking-fleet-get` | GET Fleet |
| `f5xc-api-networking-fleet-list` | List Fleet. |
| `f5xc-api-networking-fleet-update` | Replace Fleet. |
| `f5xc-api-networking-fleet-delete` | DELETE Fleet. |

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

Ask Claude to help you work with Fleet resources:

### Create Fleet

> "Create a fleet named 'example' in the 'production' namespace"

### List Fleets

> "List all fleets in the 'production' namespace"

### Get Fleet Details

> "Get details of the fleet named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create fleet -n <namespace> -i fleet.yaml

# Get
f5xcctl configuration get fleet -n <namespace> <name>

# List
f5xcctl configuration list fleet -n <namespace>

# Delete
f5xcctl configuration delete fleet -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_fleet" "example" {
  name      = "example-fleet"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
