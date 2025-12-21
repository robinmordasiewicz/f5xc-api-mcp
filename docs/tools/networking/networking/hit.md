---
page_title: f5xc_hit - f5xc-api-mcp
subcategory: Networking
description: Network Policy Hits.
---

# Hit

GET the counter for Network Policy hits for a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-hit-create` | Network Policy Hits. |

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
f5xcctl configuration create hit -n <namespace> -i hit.yaml

# Get
f5xcctl configuration get hit -n <namespace> <name>

# List
f5xcctl configuration list hit -n <namespace>

# Delete
f5xcctl configuration delete hit -n <namespace> <name>
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
