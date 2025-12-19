---
page_title: f5xc_implicit_label - f5xc-api-mcp
subcategory: Organization
description: Get Implicit Labels
---

# Implicit Label

Get is generic label query. Two types of queries are supported

* Return label with exact matching
entry label key = label value.
* Return list of labels that have prefix of label key = label
value.
Returns list of labels. Query will look into current tenants shared namespace and f5xc-io
shared.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-implicit-label-list` | Get Implicit Labels |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `key` | The key parameter |
| `key_classes` | The key_classes parameter |
| `query` | Type of Query |
| `value` | The value parameter |

## Example Usage

Ask Claude to help you work with Implicit Label resources:

### List Implicit Labels

> "List all implicit-labels in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create implicit_label -n <namespace> -i implicit_label.yaml

# Get
f5xcctl configuration get implicit_label -n <namespace> <name>

# List
f5xcctl configuration list implicit_label -n <namespace>

# Delete
f5xcctl configuration delete implicit_label -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_implicit_label" "example" {
  name      = "example-implicit-label"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
