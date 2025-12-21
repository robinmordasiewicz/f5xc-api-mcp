---
page_title: f5xc_network_interface - f5xc-api-mcp
subcategory: Networking
description: Create Network Interface.
---

# Network Interface

Network interface represents configuration of a network device.
Replace network interface will
replace the contents of given network interface object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-network-interface-create` | Create Network Interface. |
| `f5xc-api-networking-network-interface-get` | GET Network Interface. |
| `f5xc-api-networking-network-interface-list` | List Network Interface. |
| `f5xc-api-networking-network-interface-update` | Replace Network Interface. |
| `f5xc-api-networking-network-interface-delete` | DELETE Network Interface. |

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

Ask Claude to help you work with Network Interface resources:

### Create Network Interface

> "Create a network-interface named 'example' in the 'production' namespace"

### List Network Interfaces

> "List all network-interfaces in the 'production' namespace"

### Get Network Interface Details

> "Get details of the network-interface named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create network_interface -n <namespace> -i network_interface.yaml

# Get
f5xcctl configuration get network_interface -n <namespace> <name>

# List
f5xcctl configuration list network_interface -n <namespace>

# Delete
f5xcctl configuration delete network_interface -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_network_interface" "example" {
  name      = "example-network-interface"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
