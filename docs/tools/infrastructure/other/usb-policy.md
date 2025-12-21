---
page_title: f5xc_usb_policy - f5xc-api-mcp
subcategory: Infrastructure
description: Create USB policy.
---

# Usb Policy

Replaces the content of an USB policy object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-usb-policy-create` | Create USB policy. |
| `f5xc-api-infrastructure-usb-policy-get` | GET USB policy. |
| `f5xc-api-infrastructure-usb-policy-list` | List USB policy. |
| `f5xc-api-infrastructure-usb-policy-update` | Replace USB policy. |
| `f5xc-api-infrastructure-usb-policy-delete` | DELETE USB policy. |

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

Ask Claude to help you work with Usb Policy resources:

### Create Usb Policy

> "Create a usb-policy named 'example' in the 'production' namespace"

### List Usb Policys

> "List all usb-policys in the 'production' namespace"

### Get Usb Policy Details

> "Get details of the usb-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create usb_policy -n <namespace> -i usb_policy.yaml

# Get
f5xcctl configuration get usb_policy -n <namespace> <name>

# List
f5xcctl configuration list usb_policy -n <namespace>

# Delete
f5xcctl configuration delete usb_policy -n <namespace> <name>
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
