---
page_title: f5xc_bgp_peer - f5xc-api-mcp
subcategory: Network
description: Show BGP Peer Info.
---

# Bgp Peer

!!! info "Low Risk"
    Operations on this resource are generally safe.

Show BGP Peer information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgp-peer-list` | Show BGP Peer Info. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Bgp Peer resources:

### List Bgp Peers

> "List all bgp-peers in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create bgp_peer -n <namespace> -i bgp_peer.yaml

# Get
xcsh network get bgp_peer <name> -n <namespace>

# List
xcsh network list bgp_peer -n <namespace>

# Delete
xcsh network delete bgp_peer <name> -n <namespace>
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
