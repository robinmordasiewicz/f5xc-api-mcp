---
page_title: f5xc_get_schema_update - f5xc-api-mcp
subcategory: API Security
description: Get API Endpoints Schema Updates
---

# Get Schema Update

Get list of schema pairs, current and updated, for each endpoint in the request
or all pending
changes if empty list is provided.
NOTE: any API endpoint defined in user swagger files should be
ignored
DEPRECATED. USE virtual host custom api GetAPIEndpointsSchemaUpdates

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-get-schema-update-create` | Get API Endpoints Schema Updates |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Get Schema Update resources:

### Create Get Schema Update

> "Create a get-schema-update named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f get_schema_update.yaml

# Get
f5xcctl get get_schema_update {name} -n {namespace}

# List
f5xcctl get get_schema_updates -n {namespace}

# Delete
f5xcctl delete get_schema_update {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_get_schema_update" "example" {
  name      = "example-get-schema-update"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
