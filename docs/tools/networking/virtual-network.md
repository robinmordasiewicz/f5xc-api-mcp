---
page_title: f5xc_virtual_network - f5xc-api-mcp
subcategory: Networking
description: Create Virtual Network
---

# Virtual Network

Replace given virtual network in given namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-virtual-network-create` | Create Virtual Network |
| `f5xc-api-core-virtual-network-get` | Get Virtual Network |
| `f5xc-api-core-virtual-network-list` | List Virtual Network |
| `f5xc-api-core-virtual-network-update` | Replace Virtual Network |
| `f5xc-api-core-virtual-network-delete` | Delete Virtual Network |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Virtual Network resources:

### Create Virtual Network

> "Create a virtual-network named 'example' in the 'production' namespace"

### List Virtual Networks

> "List all virtual-networks in the 'production' namespace"

### Get Virtual Network Details

> "Get details of the virtual-network named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f virtual_network.yaml

# Get
f5xcctl get virtual_network {name} -n {namespace}

# List
f5xcctl get virtual_networks -n {namespace}

# Delete
f5xcctl delete virtual_network {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_virtual_network" "example" {
  name      = "example-virtual-network"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
