---
page_title: f5xc_known_label - f5xc-api-mcp
subcategory: Organization
description: Get
---

# Known Label

Get is generic label query. Two types of queries are supported Return label with exact matching
entry label key = label value. Return list of labels that have prefix of label key = label
value.
Returns list of labels. Query will look into current tenants shared namespace and f5xc-io
shared.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-known-label-list` | Get |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `key` | The key parameter |
| `query` | Query type |
| `value` | The value parameter |

## Example Usage

Ask Claude to help you work with Known Label resources:

### List Known Labels

> "List all known-labels in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f known_label.yaml

# Get
f5xcctl get known_label {name} -n {namespace}

# List
f5xcctl get known_labels -n {namespace}

# Delete
f5xcctl delete known_label {name} -n {namespace}
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
