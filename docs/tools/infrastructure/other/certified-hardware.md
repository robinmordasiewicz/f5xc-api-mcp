---
page_title: f5xc_certified_hardware - f5xc-api-mcp
subcategory: Infrastructure
description: GET Certified Hardware.
---

# Certified Hardware

List the set of certified_hardware in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-certified-hardware-get` | GET Certified Hardware. |
| `f5xc-api-infrastructure-certified-hardware-list` | List Certified Hardware. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Certified Hardware resources:

### List Certified Hardwares

> "List all certified-hardwares in the 'production' namespace"

### Get Certified Hardware Details

> "Get details of the certified-hardware named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create certified_hardware -n <namespace> -i certified_hardware.yaml

# Get
f5xcctl configuration get certified_hardware -n <namespace> <name>

# List
f5xcctl configuration list certified_hardware -n <namespace>

# Delete
f5xcctl configuration delete certified_hardware -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_certified_hardware" "example" {
  name      = "example-certified-hardware"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
