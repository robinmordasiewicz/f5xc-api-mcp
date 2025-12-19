---
page_title: f5xc_find - f5xc-api-mcp
subcategory: Organization
description: Find Filter Sets for 1 or More Context Keys
---

# Find

Retrieve any saved filter sets that are applicable for the given context key(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-find-create` | Find Filter Sets for 1 or More Context Keys |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Find resources:

### Create Find

> "Create a find named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create find -n <namespace> -i find.yaml

# Get
f5xcctl configuration get find -n <namespace> <name>

# List
f5xcctl configuration list find -n <namespace>

# Delete
f5xcctl configuration delete find -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_find" "example" {
  name      = "example-find"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
