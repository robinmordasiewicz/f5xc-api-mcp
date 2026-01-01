---
page_title: f5xc_import_bind_create - f5xc-api-mcp
subcategory: DNS
description: Import BIND Files.
---

# Import Bind Create

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Import BIND Files to Create DNS Zones.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-import-bind-create-create` | Import BIND Files. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- import-bind-create

## Example Usage

Ask Claude to help you work with Import Bind Create resources:

### Create Import Bind Create

> "Create a import-bind-create named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create import_bind_create -n <namespace> -i import_bind_create.yaml

# Get
xcsh dns get import_bind_create <name> -n <namespace>

# List
xcsh dns list import_bind_create -n <namespace>

# Delete
xcsh dns delete import_bind_create <name> -n <namespace>
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
