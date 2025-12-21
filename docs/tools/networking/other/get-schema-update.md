---
page_title: f5xc_get_schema_update - f5xc-api-mcp
subcategory: Networking
description: GET API Endpoints Schema Updates.
---

# Get Schema Update

GET list of schema paiComparablers, current and updated, for each endpoint in the request
or all
pending changes if empty list is provided.
NOTE: any API endpoint defined in user swagger files
should be ignored.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-get-schema-update-create` | GET API Endpoints Schema Updates. |

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
f5xcctl configuration create get_schema_update -n <namespace> -i get_schema_update.yaml

# Get
f5xcctl configuration get get_schema_update -n <namespace> <name>

# List
f5xcctl configuration list get_schema_update -n <namespace>

# Delete
f5xcctl configuration delete get_schema_update -n <namespace> <name>
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
