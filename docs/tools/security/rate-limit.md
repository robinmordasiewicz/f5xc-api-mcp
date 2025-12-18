---
page_title: f5xc_rate_limit - f5xc-api-mcp
subcategory: Security
description: Suggest rate limit rule
---

# Rate Limit

Suggest rate limit rule for a given path

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-rate-limit-create` | Suggest rate limit rule |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Rate Limit resources:

### Create Rate Limit

> "Create a rate-limit named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f rate_limit.yaml

# Get
f5xcctl get rate_limit {name} -n {namespace}

# List
f5xcctl get rate_limits -n {namespace}

# Delete
f5xcctl delete rate_limit {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_rate_limit" "example" {
  name      = "example-rate-limit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
