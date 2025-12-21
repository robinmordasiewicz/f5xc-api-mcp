---
page_title: f5xc_rrset - f5xc-api-mcp
subcategory: Networking
description: Create
---

# Rrset

Create CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-rrset-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | Dns_zone_name |
| `group_name` | Group_name |

## Example Usage

Ask Claude to help you work with Rrset resources:

### Create Rrset

> "Create a rrset named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create rrset -n <namespace> -i rrset.yaml

# Get
f5xcctl configuration get rrset -n <namespace> <name>

# List
f5xcctl configuration list rrset -n <namespace>

# Delete
f5xcctl configuration delete rrset -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_rrset" "example" {
  name      = "example-rrset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
