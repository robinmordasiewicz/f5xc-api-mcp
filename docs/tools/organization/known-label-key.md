---
page_title: f5xc_known_label_key - f5xc-api-mcp
subcategory: Organization
description: Get
---

# Known Label Key

Get is generic label key query. Two types of queries are supported Return label with exact matching
entry label key. Return list of labels that have prefix of label key .
Returns list of label keys.
Query will look into current tenants shared namespace and f5xc-io shared.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-known-label-key-list` | Get |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `key` | The key parameter |
| `query` | Query Type |

## Example Usage

Ask Claude to help you work with Known Label Key resources:

### List Known Label Keys

> "List all known-label-keys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create known_label_key -n <namespace> -i known_label_key.yaml

# Get
f5xcctl configuration get known_label_key -n <namespace> <name>

# List
f5xcctl configuration list known_label_key -n <namespace>

# Delete
f5xcctl configuration delete known_label_key -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_known_label_key" "example" {
  name      = "example-known-label-key"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
