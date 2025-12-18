---
page_title: f5xc_cascade_delete - f5xc-api-mcp
subcategory: Organization
description: Cascade Delete
---

# Cascade Delete

CascadeDelete will delete the namespace and all configuration objects like virtual_hosts etc.
under
it. Use this only if the entire namespace and its contents are to be wiped out.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cascade-delete-create` | Cascade Delete |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |

## Example Usage

Ask Claude to help you work with Cascade Delete resources:

### Create Cascade Delete

> "Create a cascade-delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f cascade_delete.yaml

# Get
f5xcctl get cascade_delete {name} -n {namespace}

# List
f5xcctl get cascade_deletes -n {namespace}

# Delete
f5xcctl delete cascade_delete {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_cascade_delete" "example" {
  name      = "example-cascade-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
