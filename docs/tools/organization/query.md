---
page_title: f5xc_query - f5xc-api-mcp
subcategory: Organization
description: AI Assistant Query
---

# Query

Enable service by returning service account details

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-query-create` | AI Assistant Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Query resources:

### Create Query

> "Create a query named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create query -n <namespace> -i query.yaml

# Get
f5xcctl configuration get query -n <namespace> <name>

# List
f5xcctl configuration list query -n <namespace>

# Delete
f5xcctl configuration delete query -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_query" "example" {
  name      = "example-query"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
