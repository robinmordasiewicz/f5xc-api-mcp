---
page_title: f5xc_find - f5xc-api-mcp
subcategory: Security
description: Find Filter Sets for 1 or More Context Keys.
---

# Find

Retrieve any saved filter sets that are applicable for the given context key(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-find-create` | Find Filter Sets for 1 or More Context Keys. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Find resources:

### Create Find

> "Create a find named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create find -n <namespace> -i find.yaml

# Get
f5xcctl security get find <name> -n <namespace>

# List
f5xcctl security list find -n <namespace>

# Delete
f5xcctl security delete find <name> -n <namespace>
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
