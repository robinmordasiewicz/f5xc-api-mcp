---
page_title: f5xc_update_schema - f5xc-api-mcp
subcategory: Virtual
description: Update API Endpoints Schemas.
---

# Update Schema

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the payload schema for the specified endpoints or all pending changes if empty list is
provided.
NOTE: only API endpoints returned by a call to `GetAPIEndpointsSchemaStates` can be
updated.
DEPRECATED. USE virtual host custom API UpdateAPIEndpointsSchemas.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-update-schema-create` | Update API Endpoints Schemas. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- update-schema

## Example Usage

Ask Claude to help you work with Update Schema resources:

### Create Update Schema

> "Create a update-schema named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create update_schema -n <namespace> -i update_schema.yaml

# Get
xcsh virtual get update_schema <name> -n <namespace>

# List
xcsh virtual list update_schema -n <namespace>

# Delete
xcsh virtual delete update_schema <name> -n <namespace>
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
