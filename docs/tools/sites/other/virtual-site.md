---
page_title: f5xc_virtual_site - f5xc-api-mcp
subcategory: Sites
description: Create Virtual Site.
---

# Virtual Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a given virtual site object in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-virtual-site-create` | Create Virtual Site. |
| `f5xc-api-sites-virtual-site-get` | GET Virtual Site. |
| `f5xc-api-sites-virtual-site-list` | List Virtual Site. |
| `f5xc-api-sites-virtual-site-update` | Replace Virtual Site. |
| `f5xc-api-sites-virtual-site-delete` | DELETE Virtual Site. |

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

- virtual-site

**Modifies:**

- virtual-site

**Deletes:**

- virtual-site
- contained_resources

## Example Usage

Ask Claude to help you work with Virtual Site resources:

### Create Virtual Site

> "Create a virtual-site named 'example' in the 'production' namespace"

### List Virtual Sites

> "List all virtual-sites in the 'production' namespace"

### Get Virtual Site Details

> "Get details of the virtual-site named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create virtual_site -n <namespace> -i virtual_site.yaml

# Get
xcsh sites get virtual_site <name> -n <namespace>

# List
xcsh sites list virtual_site -n <namespace>

# Delete
xcsh sites delete virtual_site <name> -n <namespace>
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
