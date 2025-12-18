---
page_title: f5xc_dhcp_lease - f5xc-api-mcp
subcategory: Organization
description: Show DHCP Leases
---

# Dhcp Lease

Get DHCP lease information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dhcp-lease-list` | Show DHCP Leases |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Dhcp Lease resources:

### List Dhcp Leases

> "List all dhcp-leases in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f dhcp_lease.yaml

# Get
f5xcctl get dhcp_lease {name} -n {namespace}

# List
f5xcctl get dhcp_leases -n {namespace}

# Delete
f5xcctl delete dhcp_lease {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_dhcp_lease" "example" {
  name      = "example-dhcp-lease"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
