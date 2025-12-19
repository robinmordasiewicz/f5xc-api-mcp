---
page_title: f5xc_bgp_peer_statu - f5xc-api-mcp
subcategory: Networking
description: BGP Peer Status
---

# Bgp Peer Statu

API to get routed DDoS BGP peer status information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bgp-peer-statu-create` | BGP Peer Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Bgp Peer Statu resources:

### Create Bgp Peer Statu

> "Create a bgp-peer-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bgp_peer_statu.yaml

# Get
f5xcctl get bgp_peer_statu {name} -n {namespace}

# List
f5xcctl get bgp_peer_status -n {namespace}

# Delete
f5xcctl delete bgp_peer_statu {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bgp_peer_statu" "example" {
  name      = "example-bgp-peer-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
