---
page_title: f5xc_fleet - f5xc-api-mcp
subcategory: Ce Management
description: Create Fleet.
---

# Fleet

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create fleet will create a fleet object in 'system' namespace of the user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-fleet-create` | Create Fleet. |
| `f5xc-api-cemanagement-fleet-get` | GET Fleet |
| `f5xc-api-cemanagement-fleet-list` | List Fleet. |
| `f5xc-api-cemanagement-fleet-update` | Replace Fleet. |
| `f5xc-api-cemanagement-fleet-delete` | DELETE Fleet. |

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

- fleet

**Modifies:**

- fleet

**Deletes:**

- fleet
- contained_resources

## Example Usage

Ask Claude to help you work with Fleet resources:

### Create Fleet

> "Create a fleet named 'example' in the 'production' namespace"

### List Fleets

> "List all fleets in the 'production' namespace"

### Get Fleet Details

> "Get details of the fleet named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create fleet -n <namespace> -i fleet.yaml

# Get
xcsh ce_management get fleet <name> -n <namespace>

# List
xcsh ce_management list fleet -n <namespace>

# Delete
xcsh ce_management delete fleet <name> -n <namespace>
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
