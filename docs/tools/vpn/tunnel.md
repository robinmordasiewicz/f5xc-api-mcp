---
page_title: f5xc_tunnel - f5xc-api-mcp
subcategory: VPN
description: Create Tunnel.
---

# Tunnel

Create tunnel in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-vpn-tunnel-create` | Create Tunnel. |
| `f5xc-api-vpn-tunnel-get` | GET Tunnel. |
| `f5xc-api-vpn-tunnel-list` | List Tunnel. |
| `f5xc-api-vpn-tunnel-update` | Replace Tunnel. |
| `f5xc-api-vpn-tunnel-delete` | DELETE Tunnel. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Tunnel resources:

### Create Tunnel

> "Create a tunnel named 'example' in the 'production' namespace"

### List Tunnels

> "List all tunnels in the 'production' namespace"

### Get Tunnel Details

> "Get details of the tunnel named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tunnel -n <namespace> -i tunnel.yaml

# Get
f5xcctl configuration get tunnel -n <namespace> <name>

# List
f5xcctl configuration list tunnel -n <namespace>

# Delete
f5xcctl configuration delete tunnel -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tunnel" "example" {
  name      = "example-tunnel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
