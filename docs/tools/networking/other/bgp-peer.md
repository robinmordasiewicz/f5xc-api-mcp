---
page_title: f5xc_bgp_peer - f5xc-api-mcp
subcategory: Networking
description: Show BGP Peer Info.
---

# Bgp Peer

Show BGP Peer information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-bgp-peer-list` | Show BGP Peer Info. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Bgp Peer resources:

### List Bgp Peers

> "List all bgp-peers in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bgp_peer -n <namespace> -i bgp_peer.yaml

# Get
f5xcctl configuration get bgp_peer -n <namespace> <name>

# List
f5xcctl configuration list bgp_peer -n <namespace>

# Delete
f5xcctl configuration delete bgp_peer -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_bgp_peer" "example" {
  name      = "example-bgp-peer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
