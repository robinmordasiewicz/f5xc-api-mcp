---
page_title: f5xc_Schema - f5xc-api-mcp
subcategory: Organization
description: Schemas By ID
---

# Schema

Schemas By ID

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-schema-get` | Schemas By ID |
| `f5xc-api-core-schema-list` | Schemas |

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

Ask Claude to help you work with Schema resources:

### List Schemas

> "List all Schemas in the 'production' namespace"

### Get Schema Details

> "Get details of the Schema named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f Schema.yaml

# Get
f5xcctl get Schema {name} -n {namespace}

# List
f5xcctl get Schemas -n {namespace}

# Delete
f5xcctl delete Schema {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_Schema" "example" {
  name      = "example-Schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
