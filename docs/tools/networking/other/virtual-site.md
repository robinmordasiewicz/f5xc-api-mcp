---
page_title: f5xc_virtual_site - f5xc-api-mcp
subcategory: Networking
description: Create Virtual Site.
---

# Virtual Site

Replace a given virtual site object in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-virtual-site-create` | Create Virtual Site. |
| `f5xc-api-networking-virtual-site-get` | GET Virtual Site. |
| `f5xc-api-networking-virtual-site-list` | List Virtual Site. |
| `f5xc-api-networking-virtual-site-update` | Replace Virtual Site. |
| `f5xc-api-networking-virtual-site-delete` | DELETE Virtual Site. |

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

Ask Claude to help you work with Virtual Site resources:

### Create Virtual Site

> "Create a virtual-site named 'example' in the 'production' namespace"

### List Virtual Sites

> "List all virtual-sites in the 'production' namespace"

### Get Virtual Site Details

> "Get details of the virtual-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create virtual_site -n <namespace> -i virtual_site.yaml

# Get
f5xcctl configuration get virtual_site -n <namespace> <name>

# List
f5xcctl configuration list virtual_site -n <namespace>

# Delete
f5xcctl configuration delete virtual_site -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_virtual_site" "example" {
  name      = "example-virtual-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
