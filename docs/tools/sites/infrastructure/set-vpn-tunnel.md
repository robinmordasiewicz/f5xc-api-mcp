---
page_title: f5xc_set_vpn_tunnel - f5xc-api-mcp
subcategory: Sites
description: Configure VPN Tunnels.
---

# Set Vpn Tunnel

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure VPC IP prefix set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-vpn-tunnel-create` | Configure VPN Tunnels. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `AWS-tgw-site-1.` |
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-vpn-tunnel

## Example Usage

Ask Claude to help you work with Set Vpn Tunnel resources:

### Create Set Vpn Tunnel

> "Create a set-vpn-tunnel named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create set_vpn_tunnel -n <namespace> -i set_vpn_tunnel.yaml

# Get
xcsh sites get set_vpn_tunnel <name> -n <namespace>

# List
xcsh sites list set_vpn_tunnel -n <namespace>

# Delete
xcsh sites delete set_vpn_tunnel <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_set_vpn_tunnel" "example" {
  name      = "example-set-vpn-tunnel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
