---
page_title: f5xc_ep - f5xc-api-mcp
subcategory: Organization
description: PostSafeEp
---

# Ep

Post Safe Analyst Station ep request

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-ep-create` | PostSafeEp |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Ep resources:

### Create Ep

> "Create a ep named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f ep.yaml

# Get
f5xcctl get ep {name} -n {namespace}

# List
f5xcctl get eps -n {namespace}

# Delete
f5xcctl delete ep {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_ep" "example" {
  name      = "example-ep"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
