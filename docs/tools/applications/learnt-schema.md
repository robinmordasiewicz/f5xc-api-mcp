---
page_title: f5xc_learnt_schema - f5xc-api-mcp
subcategory: Applications
description: GET Learnt Schema per API endpoint.
---

# Learnt Schema

GET Learnt Schema per API endpoint for a given auto discovered API endpoint for Service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-learnt-schema-create` | GET Learnt Schema per API endpoint. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Learnt Schema resources:

### Create Learnt Schema

> "Create a learnt-schema named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl applications create learnt_schema -n <namespace> -i learnt_schema.yaml

# Get
f5xcctl applications get learnt_schema <name> -n <namespace>

# List
f5xcctl applications list learnt_schema -n <namespace>

# Delete
f5xcctl applications delete learnt_schema <name> -n <namespace>
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
