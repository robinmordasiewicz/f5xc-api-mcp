---
page_title: f5xc_rrset - f5xc-api-mcp
subcategory: DNS
description: Create
---

# Rrset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Create CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-rrset-create` | Create |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dns_zone_name` | Dns_zone_name | `-` |
| `group_name` | Group_name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rrset

## Example Usage

Ask Claude to help you work with Rrset resources:

### Create Rrset

> "Create a rrset named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create rrset -n <namespace> -i rrset.yaml

# Get
xcsh dns get rrset <name> -n <namespace>

# List
xcsh dns list rrset -n <namespace>

# Delete
xcsh dns delete rrset <name> -n <namespace>
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
