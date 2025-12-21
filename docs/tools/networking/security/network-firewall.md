---
page_title: f5xc_network_firewall - f5xc-api-mcp
subcategory: Networking
description: Create Network Firewall.
---

# Network Firewall

Replace network firewall will replace the contains of given object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-network-firewall-create` | Create Network Firewall. |
| `f5xc-api-networking-network-firewall-get` | GET Network Firewall. |
| `f5xc-api-networking-network-firewall-list` | List Network Firewall. |
| `f5xc-api-networking-network-firewall-update` | Replace Network Firewall. |
| `f5xc-api-networking-network-firewall-delete` | DELETE Network Firewall. |

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

Ask Claude to help you work with Network Firewall resources:

### Create Network Firewall

> "Create a network-firewall named 'example' in the 'production' namespace"

### List Network Firewalls

> "List all network-firewalls in the 'production' namespace"

### Get Network Firewall Details

> "Get details of the network-firewall named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create network_firewall -n <namespace> -i network_firewall.yaml

# Get
f5xcctl configuration get network_firewall -n <namespace> <name>

# List
f5xcctl configuration list network_firewall -n <namespace>

# Delete
f5xcctl configuration delete network_firewall -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_network_firewall" "example" {
  name      = "example-network-firewall"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
