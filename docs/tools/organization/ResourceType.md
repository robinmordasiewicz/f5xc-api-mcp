---
page_title: f5xc_ResourceType - f5xc-api-mcp
subcategory: Organization
description: Get supported resources type
---

# ResourceType

Get supported resources type

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-resourcetype-get` | Get supported resources type |
| `f5xc-api-core-resourcetype-list` | Get supported resources type |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Id |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `excludedAttributes` | The excludedAttributes parameter |

## Example Usage

Ask Claude to help you work with ResourceType resources:

### List ResourceTypes

> "List all ResourceTypes in the 'production' namespace"

### Get ResourceType Details

> "Get details of the ResourceType named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ResourceType -n <namespace> -i ResourceType.yaml

# Get
f5xcctl configuration get ResourceType -n <namespace> <name>

# List
f5xcctl configuration list ResourceType -n <namespace>

# Delete
f5xcctl configuration delete ResourceType -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ResourceType" "example" {
  name      = "example-ResourceType"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
