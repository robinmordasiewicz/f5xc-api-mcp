---
page_title: f5xc_usb_policy - f5xc-api-mcp
subcategory: Ce Management
description: Create USB policy.
---

# Usb Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces the content of an USB policy object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-usb-policy-create` | Create USB policy. |
| `f5xc-api-cemanagement-usb-policy-get` | GET USB policy. |
| `f5xc-api-cemanagement-usb-policy-list` | List USB policy. |
| `f5xc-api-cemanagement-usb-policy-update` | Replace USB policy. |
| `f5xc-api-cemanagement-usb-policy-delete` | DELETE USB policy. |

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

- usb-policy

**Modifies:**

- usb-policy

**Deletes:**

- usb-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Usb Policy resources:

### Create Usb Policy

> "Create a usb-policy named 'example' in the 'production' namespace"

### List Usb Policys

> "List all usb-policys in the 'production' namespace"

### Get Usb Policy Details

> "Get details of the usb-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create usb_policy -n <namespace> -i usb_policy.yaml

# Get
xcsh ce_management get usb_policy <name> -n <namespace>

# List
xcsh ce_management list usb_policy -n <namespace>

# Delete
xcsh ce_management delete usb_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_usb_policy" "example" {
  name      = "example-usb-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
