---
page_title: f5xc_update_schema - f5xc-api-mcp
subcategory: Organization
description: Update API Endpoints Schemas
---

# Update Schema

Update the payload schema for the specified endpoints or all pending changes if empty list is
provided.
NOTE: only API endpoints returned by a call to `GetAPIEndpointsSchemaStates` can be
updated.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-update-schema-create` | Update API Endpoints Schemas |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Schema resources:

### Create Update Schema

> "Create a update-schema named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f update_schema.yaml

# Get
f5xcctl get update_schema {name} -n {namespace}

# List
f5xcctl get update_schemas -n {namespace}

# Delete
f5xcctl delete update_schema {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_update_schema" "example" {
  name      = "example-update-schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
