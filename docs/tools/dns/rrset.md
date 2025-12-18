---
page_title: f5xc_rrset - f5xc-api-mcp
subcategory: DNS
description: Create
---

# Rrset

Create

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-rrset-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `dns_zone_name` | dns_zone_name |
| `group_name` | group_name |

## Example Usage

Ask Claude to help you work with Rrset resources:

### Create Rrset

> "Create a rrset named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f rrset.yaml

# Get
f5xcctl get rrset {name} -n {namespace}

# List
f5xcctl get rrsets -n {namespace}

# Delete
f5xcctl delete rrset {name} -n {namespace}
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
