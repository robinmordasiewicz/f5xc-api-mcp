---
page_title: f5xc_update_tunnel_statu - f5xc-api-mcp
subcategory: VPN
description: Update Tunnel Status
---

# Update Tunnel Statu

Update Tunnel Status

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-update-tunnel-statu-create` | Update Tunnel Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Tunnel Statu resources:

### Create Update Tunnel Statu

> "Create a update-tunnel-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f update_tunnel_statu.yaml

# Get
f5xcctl get update_tunnel_statu {name} -n {namespace}

# List
f5xcctl get update_tunnel_status -n {namespace}

# Delete
f5xcctl delete update_tunnel_statu {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_update_tunnel_statu" "example" {
  name      = "example-update-tunnel-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
