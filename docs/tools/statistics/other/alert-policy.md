---
page_title: f5xc_alert_policy - f5xc-api-mcp
subcategory: Statistics
description: Create Alert Policy.
---

# Alert Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of the Alert Policy Object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-alert-policy-create` | Create Alert Policy. |
| `f5xc-api-statistics-alert-policy-get` | GET Alert Policy. |
| `f5xc-api-statistics-alert-policy-list` | List Alert Policy. |
| `f5xc-api-statistics-alert-policy-update` | Replace Alert Policy. |
| `f5xc-api-statistics-alert-policy-delete` | DELETE Alert Policy. |

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

- alert-policy

**Modifies:**

- alert-policy

**Deletes:**

- alert-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Alert Policy resources:

### Create Alert Policy

> "Create a alert-policy named 'example' in the 'production' namespace"

### List Alert Policys

> "List all alert-policys in the 'production' namespace"

### Get Alert Policy Details

> "Get details of the alert-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create alert_policy -n <namespace> -i alert_policy.yaml

# Get
xcsh statistics get alert_policy <name> -n <namespace>

# List
xcsh statistics list alert_policy -n <namespace>

# Delete
xcsh statistics delete alert_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_alert_policy" "example" {
  name      = "example-alert-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
