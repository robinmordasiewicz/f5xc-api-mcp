---
page_title: f5xc_set_vpn_tunnel - f5xc-api-mcp
subcategory: Organization
description: Configure VPN Tunnels
---

# Set Vpn Tunnel

Configure VPC IP prefix set

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-set-vpn-tunnel-create` | Configure VPN Tunnels |

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
f5xcctl apply -f set_vpn_tunnel.yaml

# Get
f5xcctl get set_vpn_tunnel {name} -n {namespace}

# List
f5xcctl get set_vpn_tunnels -n {namespace}

# Delete
f5xcctl delete set_vpn_tunnel {name} -n {namespace}
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
