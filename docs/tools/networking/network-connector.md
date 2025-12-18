---
page_title: f5xc_network_connector - f5xc-api-mcp
subcategory: Networking
description: Create Network Connector
---

# Network Connector

Replace Network Connector will replace the contains of given object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-network-connector-create` | Create Network Connector |
| `f5xc-api-network-network-connector-get` | Get Network Connector |
| `f5xc-api-network-network-connector-list` | List Network Connector |
| `f5xc-api-network-network-connector-update` | Replace Network Connector |
| `f5xc-api-network-network-connector-delete` | Delete Network Connector |

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

Ask Claude to help you work with Network Connector resources:

### Create Network Connector

> "Create a network-connector named 'example' in the 'production' namespace"

### List Network Connectors

> "List all network-connectors in the 'production' namespace"

### Get Network Connector Details

> "Get details of the network-connector named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f network_connector.yaml

# Get
f5xcctl get network_connector {name} -n {namespace}

# List
f5xcctl get network_connectors -n {namespace}

# Delete
f5xcctl delete network_connector {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_network_connector" "example" {
  name      = "example-network-connector"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
