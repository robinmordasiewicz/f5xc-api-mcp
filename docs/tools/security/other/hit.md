---
page_title: f5xc_hit - f5xc-api-mcp
subcategory: Security
description: Enhanced Firewall Policy Hits.
---

# Hit

GET the counter for Enhanced Firewall Policy hits for a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-hit-create` | Enhanced Firewall Policy Hits. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Hit resources:

### Create Hit

> "Create a hit named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create hit -n <namespace> -i hit.yaml

# Get
f5xcctl security get hit <name> -n <namespace>

# List
f5xcctl security list hit -n <namespace>

# Delete
f5xcctl security delete hit <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_hit" "example" {
  name      = "example-hit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
