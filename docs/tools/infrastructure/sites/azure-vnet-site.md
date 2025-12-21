---
page_title: f5xc_azure_vnet_site - f5xc-api-mcp
subcategory: Infrastructure
description: Create Azure VNet site.
---

# AZURE VNET Site

Shape of the Azure VNet site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-azure-vnet-site-create` | Create Azure VNet site. |
| `f5xc-api-infrastructure-azure-vnet-site-get` | GET Azure VNet site. |
| `f5xc-api-infrastructure-azure-vnet-site-list` | List Configure Azure VNet Site. |
| `f5xc-api-infrastructure-azure-vnet-site-update` | Replace Azure VNet site. |
| `f5xc-api-infrastructure-azure-vnet-site-delete` | DELETE Configure Azure VNet Site. |

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

Ask Claude to help you work with AZURE VNET Site resources:

### Create AZURE VNET Site

> "Create a azure-vnet-site named 'example' in the 'production' namespace"

### List AZURE VNET Sites

> "List all azure-vnet-sites in the 'production' namespace"

### Get AZURE VNET Site Details

> "Get details of the azure-vnet-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create azure_vnet_site -n <namespace> -i azure_vnet_site.yaml

# Get
f5xcctl infrastructure get azure_vnet_site <name> -n <namespace>

# List
f5xcctl infrastructure list azure_vnet_site -n <namespace>

# Delete
f5xcctl infrastructure delete azure_vnet_site <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_azure_vnet_site" "example" {
  name      = "example-azure-vnet-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
