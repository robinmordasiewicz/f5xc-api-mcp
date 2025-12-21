---
page_title: f5xc_import_bind_create - f5xc-api-mcp
subcategory: Networking
description: Import BIND Files.
---

# Import Bind Create

Import BIND Files to Create DNS Zones.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-import-bind-create-create` | Import BIND Files. |

## Example Usage

Ask Claude to help you work with Import Bind Create resources:

### Create Import Bind Create

> "Create a import-bind-create named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create import_bind_create -n <namespace> -i import_bind_create.yaml

# Get
f5xcctl networking get import_bind_create <name> -n <namespace>

# List
f5xcctl networking list import_bind_create -n <namespace>

# Delete
f5xcctl networking delete import_bind_create <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_import_bind_create" "example" {
  name      = "example-import-bind-create"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
