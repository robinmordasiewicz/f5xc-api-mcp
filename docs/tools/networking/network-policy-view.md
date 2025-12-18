---
page_title: f5xc_network_policy_view - f5xc-api-mcp
subcategory: Networking
description: Create Network policy View
---

# Network Policy View

Shape of the Network policy view replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-network-policy-view-create` | Create Network policy View |
| `f5xc-api-core-network-policy-view-get` | Get Network policy View |
| `f5xc-api-core-network-policy-view-list` | List Configure Network policy View |
| `f5xc-api-core-network-policy-view-update` | Replace Network policy View |
| `f5xc-api-core-network-policy-view-delete` | Delete Configure Network policy View |

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

Ask Claude to help you work with Network Policy View resources:

### Create Network Policy View

> "Create a network-policy-view named 'example' in the 'production' namespace"

### List Network Policy Views

> "List all network-policy-views in the 'production' namespace"

### Get Network Policy View Details

> "Get details of the network-policy-view named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f network_policy_view.yaml

# Get
f5xcctl get network_policy_view {name} -n {namespace}

# List
f5xcctl get network_policy_views -n {namespace}

# Delete
f5xcctl delete network_policy_view {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_network_policy_view" "example" {
  name      = "example-network-policy-view"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
