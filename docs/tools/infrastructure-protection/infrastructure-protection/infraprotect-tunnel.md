---
page_title: f5xc_infraprotect_tunnel - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Create DDoS Transit Tunnel.
---

# Infraprotect Tunnel

List the set of infraprotect_tunnel in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-infraprotect-tunnel-create` | Create DDoS Transit Tunnel. |
| `f5xc-api-infrastructureprotection-infraprotect-tunnel-get` | GET Tunnel. |
| `f5xc-api-infrastructureprotection-infraprotect-tunnel-list` | List Tunnel. |
| `f5xc-api-infrastructureprotection-infraprotect-tunnel-update` | Replace DDoS Transit Tunnel. |
| `f5xc-api-infrastructureprotection-infraprotect-tunnel-delete` | DELETE Tunnel. |

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

Ask Claude to help you work with Infraprotect Tunnel resources:

### Create Infraprotect Tunnel

> "Create a infraprotect-tunnel named 'example' in the 'production' namespace"

### List Infraprotect Tunnels

> "List all infraprotect-tunnels in the 'production' namespace"

### Get Infraprotect Tunnel Details

> "Get details of the infraprotect-tunnel named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create infraprotect_tunnel -n <namespace> -i infraprotect_tunnel.yaml

# Get
f5xcctl configuration get infraprotect_tunnel -n <namespace> <name>

# List
f5xcctl configuration list infraprotect_tunnel -n <namespace>

# Delete
f5xcctl configuration delete infraprotect_tunnel -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_tunnel" "example" {
  name      = "example-infraprotect-tunnel"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
