---
page_title: f5xc_azure_vnet_site - f5xc-api-mcp
subcategory: Sites
description: Create Azure VNet site.
---

# AZURE VNET Site

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Azure VNet site replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-azure-vnet-site-create` | Create Azure VNet site. |
| `f5xc-api-sites-azure-vnet-site-get` | GET Azure VNet site. |
| `f5xc-api-sites-azure-vnet-site-list` | List Configure Azure VNet Site. |
| `f5xc-api-sites-azure-vnet-site-update` | Replace Azure VNet site. |
| `f5xc-api-sites-azure-vnet-site-delete` | DELETE Configure Azure VNet Site. |

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

- azure-vnet-site

**Modifies:**

- azure-vnet-site

**Deletes:**

- azure-vnet-site
- contained_resources

## Example Usage

Ask Claude to help you work with AZURE VNET Site resources:

### Create AZURE VNET Site

> "Create a azure-vnet-site named 'example' in the 'production' namespace"

### List AZURE VNET Sites

> "List all azure-vnet-sites in the 'production' namespace"

### Get AZURE VNET Site Details

> "Get details of the azure-vnet-site named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config azure-vnet-site create {name} --namespace {namespace}
```

Create azure-vnet-site

### file_based

```bash
f5xcctl config azure-vnet-site create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config azure-vnet-site delete {name} --namespace {namespace}
```

Delete azure-vnet-site

### get_specific

```bash
f5xcctl config azure-vnet-site get {name} --namespace {namespace}
```

Get specific azure-vnet-site

### list_all

```bash
f5xcctl config azure-vnet-site list --namespace {namespace}
```

List all azure-vnet-sites

### update

```bash
f5xcctl config azure-vnet-site update {name} --namespace {namespace} -f {file}.yaml
```

Update azure-vnet-site

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create azure_vnet_site -n <namespace> -i azure_vnet_site.yaml

# Get
f5xcctl sites get azure_vnet_site <name> -n <namespace>

# List
f5xcctl sites list azure_vnet_site -n <namespace>

# Delete
f5xcctl sites delete azure_vnet_site <name> -n <namespace>
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
