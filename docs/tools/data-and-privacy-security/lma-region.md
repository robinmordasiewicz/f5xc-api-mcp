---
page_title: f5xc_lma_region - f5xc-api-mcp
subcategory: Data And Privacy Security
description: GET LMA Region.
---

# Lma Region

!!! info "Low Risk"
    Operations on this resource are generally safe.

List the set of lma_region in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataandprivacysecurity-lma-region-get` | GET LMA Region. |
| `f5xc-api-dataandprivacysecurity-lma-region-list` | List LMA Region. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Example Usage

Ask Claude to help you work with Lma Region resources:

### List Lma Regions

> "List all lma-regions in the 'production' namespace"

### Get Lma Region Details

> "Get details of the lma-region named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl config lma-region get {name} --namespace {namespace}
```

Get specific lma-region

### list_all

```bash
f5xcctl config lma-region list --namespace {namespace}
```

List all lma-regions

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl data_and_privacy_security create lma_region -n <namespace> -i lma_region.yaml

# Get
f5xcctl data_and_privacy_security get lma_region <name> -n <namespace>

# List
f5xcctl data_and_privacy_security list lma_region -n <namespace>

# Delete
f5xcctl data_and_privacy_security delete lma_region <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_lma_region" "example" {
  name      = "example-lma-region"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
