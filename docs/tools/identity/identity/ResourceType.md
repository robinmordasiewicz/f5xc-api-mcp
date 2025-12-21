---
page_title: f5xc_ResourceType - f5xc-api-mcp
subcategory: Identity
description: GET supported resources type.
---

# ResourceType

Getresourcetypesbyid CustomPublicAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-resourcetype-get` | GET supported resources type. |
| `f5xc-api-identity-resourcetype-list` | GET supported resources type. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `excludedAttributes` | Members"]" |

## Example Usage

Ask Claude to help you work with ResourceType resources:

### List ResourceTypes

> "List all ResourceTypes in the 'production' namespace"

### Get ResourceType Details

> "Get details of the ResourceType named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create ResourceType -n <namespace> -i ResourceType.yaml

# Get
f5xcctl identity get ResourceType <name> -n <namespace>

# List
f5xcctl identity list ResourceType -n <namespace>

# Delete
f5xcctl identity delete ResourceType <name> -n <namespace>
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
