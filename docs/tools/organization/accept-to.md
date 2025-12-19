---
page_title: f5xc_accept_to - f5xc-api-mcp
subcategory: Organization
description: Accept TOS
---

# Accept To

Accept TOS updates version of accepted terms of service.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-accept-to-create` | Accept TOS |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Accept To resources:

### Create Accept To

> "Create a accept-to named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create accept_to -n <namespace> -i accept_to.yaml

# Get
f5xcctl configuration get accept_to -n <namespace> <name>

# List
f5xcctl configuration list accept_to -n <namespace>

# Delete
f5xcctl configuration delete accept_to -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_accept_to" "example" {
  name      = "example-accept-to"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
