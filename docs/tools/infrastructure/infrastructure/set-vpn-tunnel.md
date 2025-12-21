---
page_title: f5xc_set_vpn_tunnel - f5xc-api-mcp
subcategory: Infrastructure
description: Configure VPN Tunnels.
---

# Set Vpn Tunnel

Configure VPC IP prefix set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-set-vpn-tunnel-create` | Configure VPN Tunnels. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Set Vpn Tunnel resources:

### Create Set Vpn Tunnel

> "Create a set-vpn-tunnel named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create set_vpn_tunnel -n <namespace> -i set_vpn_tunnel.yaml

# Get
f5xcctl configuration get set_vpn_tunnel -n <namespace> <name>

# List
f5xcctl configuration list set_vpn_tunnel -n <namespace>

# Delete
f5xcctl configuration delete set_vpn_tunnel -n <namespace> <name>
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
