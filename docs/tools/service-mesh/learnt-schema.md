---
page_title: f5xc_learnt_schema - f5xc-api-mcp
subcategory: Service Mesh
description: GET Learnt Schema per API endpoint.
---

# Learnt Schema

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Learnt Schema per API endpoint for a given auto discovered API endpoint for Service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-learnt-schema-create` | GET Learnt Schema per API endpoint. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- learnt-schema

## Example Usage

Ask Claude to help you work with Learnt Schema resources:

### Create Learnt Schema

> "Create a learnt-schema named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create learnt_schema -n <namespace> -i learnt_schema.yaml

# Get
xcsh service_mesh get learnt_schema <name> -n <namespace>

# List
xcsh service_mesh list learnt_schema -n <namespace>

# Delete
xcsh service_mesh delete learnt_schema <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_learnt_schema" "example" {
  name      = "example-learnt-schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
