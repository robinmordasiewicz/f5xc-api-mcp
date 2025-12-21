---
page_title: f5xc_known_label - f5xc-api-mcp
subcategory: Config
description: GET
---

# Known Label

GET is generic label query. Two types of queries are supported
Return label with exact matching
entry label key = label value.
Return list of labels that have prefix of label key = label
value.
Returns list of labels. Query will look into current tenants shared namespace and VES-I/O
shared.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-config-known-label-list` | GET |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `key` | Key of the label to be retrieved. |
| `query` | Query type |
| `value` | Value of the label to be retrieved. |

## Example Usage

Ask Claude to help you work with Known Label resources:

### List Known Labels

> "List all known-labels in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create known_label -n <namespace> -i known_label.yaml

# Get
f5xcctl configuration get known_label -n <namespace> <name>

# List
f5xcctl configuration list known_label -n <namespace>

# Delete
f5xcctl configuration delete known_label -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_known_label" "example" {
  name      = "example-known-label"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
