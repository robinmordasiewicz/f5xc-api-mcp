---
page_title: f5xc_cdn_cache_rule - f5xc-api-mcp
subcategory: CDN
description: Create CDN cache rule.
---

# Cdn Cache Rule

List the set of cdn_cache_rule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-cdn-cache-rule-create` | Create CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-get` | GET CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-list` | List CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-update` | Replace CDN cache rule. |
| `f5xc-api-cdn-cdn-cache-rule-delete` | DELETE CDN cache rule. |

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

Ask Claude to help you work with Cdn Cache Rule resources:

### Create Cdn Cache Rule

> "Create a cdn-cache-rule named 'example' in the 'production' namespace"

### List Cdn Cache Rules

> "List all cdn-cache-rules in the 'production' namespace"

### Get Cdn Cache Rule Details

> "Get details of the cdn-cache-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create cdn_cache_rule -n <namespace> -i cdn_cache_rule.yaml

# Get
f5xcctl cdn get cdn_cache_rule <name> -n <namespace>

# List
f5xcctl cdn list cdn_cache_rule -n <namespace>

# Delete
f5xcctl cdn delete cdn_cache_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_cdn_cache_rule" "example" {
  name      = "example-cdn-cache-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
