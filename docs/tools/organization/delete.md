---
page_title: f5xc_delete - f5xc-api-mcp
subcategory: Organization
description: Delete
---

# Delete

Delete will delete a given label label key = label value from current tenants shared namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-delete-create` | Delete |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Delete resources:

### Create Delete

> "Create a delete named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f delete.yaml

# Get
f5xcctl get delete {name} -n {namespace}

# List
f5xcctl get deletes -n {namespace}

# Delete
f5xcctl delete delete {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_delete" "example" {
  name      = "example-delete"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
