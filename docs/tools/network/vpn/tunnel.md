---
page_title: f5xc_tunnel - f5xc-api-mcp
subcategory: Network
description: Create Tunnel.
---

# Tunnel

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create tunnel in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-tunnel-create` | Create Tunnel. |
| `f5xc-api-network-tunnel-get` | GET Tunnel. |
| `f5xc-api-network-tunnel-list` | List Tunnel. |
| `f5xc-api-network-tunnel-update` | Replace Tunnel. |
| `f5xc-api-network-tunnel-delete` | DELETE Tunnel. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- tunnel

**Modifies:**

- tunnel

**Deletes:**

- tunnel
- contained_resources

## Example Usage

Ask Claude to help you work with Tunnel resources:

### Create Tunnel

> "Create a tunnel named 'example' in the 'production' namespace"

### List Tunnels

> "List all tunnels in the 'production' namespace"

### Get Tunnel Details

> "Get details of the tunnel named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create tunnel -n <namespace> -i tunnel.yaml

# Get
xcsh network get tunnel <name> -n <namespace>

# List
xcsh network list tunnel -n <namespace>

# Delete
xcsh network delete tunnel <name> -n <namespace>
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
