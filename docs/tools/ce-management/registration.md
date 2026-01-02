---
page_title: f5xc_registration - f5xc-api-mcp
subcategory: Ce Management
description: Create Registration.
---

# Registration

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

VPM creates registration using this message, never used by users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registration-create` | Create Registration. |
| `f5xc-api-cemanagement-registration-get` | GET Registration. |
| `f5xc-api-cemanagement-registration-list` | List Registration. |
| `f5xc-api-cemanagement-registration-update` | Replace Registration. |
| `f5xc-api-cemanagement-registration-delete` | DELETE Registration. |

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
| `fail_if_referred` | Fail the DELETE operation if this object is being referred by other objects. | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- registration

**Modifies:**

- registration

**Deletes:**

- registration
- contained_resources

## Example Usage

Ask Claude to help you work with Registration resources:

### Create Registration

> "Create a registration named 'example' in the 'production' namespace"

### List Registrations

> "List all registrations in the 'production' namespace"

### Get Registration Details

> "Get details of the registration named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create registration -n <namespace> -i registration.yaml

# Get
xcsh ce_management get registration <name> -n <namespace>

# List
xcsh ce_management list registration -n <namespace>

# Delete
xcsh ce_management delete registration <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_registration" "example" {
  name      = "example-registration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
