---
page_title: f5xc_filter_set - f5xc-api-mcp
subcategory: Security
description: Create Specification.
---

# Filter Set

List the set of filter_set in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-filter-set-create` | Create Specification. |
| `f5xc-api-security-filter-set-get` | GET Specification. |
| `f5xc-api-security-filter-set-list` | List Filter Set. |
| `f5xc-api-security-filter-set-update` | Replace Specification. |
| `f5xc-api-security-filter-set-delete` | DELETE Filter Set. |

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

Ask Claude to help you work with Filter Set resources:

### Create Filter Set

> "Create a filter-set named 'example' in the 'production' namespace"

### List Filter Sets

> "List all filter-sets in the 'production' namespace"

### Get Filter Set Details

> "Get details of the filter-set named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create filter_set -n <namespace> -i filter_set.yaml

# Get
f5xcctl configuration get filter_set -n <namespace> <name>

# List
f5xcctl configuration list filter_set -n <namespace>

# Delete
f5xcctl configuration delete filter_set -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_filter_set" "example" {
  name      = "example-filter-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
