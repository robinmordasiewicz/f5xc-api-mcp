---
page_title: f5xc_srv6_network_slice - f5xc-api-mcp
subcategory: Service Mesh
description: Create SRv6 Network Slice
---

# Srv6 Network Slice

Replace srv6_network_slice replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-srv6-network-slice-create` | Create SRv6 Network Slice |
| `f5xc-api-core-srv6-network-slice-get` | Get SRv6 Network Slice |
| `f5xc-api-core-srv6-network-slice-list` | List SRv6 Network Slice |
| `f5xc-api-core-srv6-network-slice-update` | Replace SRv6 Network Slice |
| `f5xc-api-core-srv6-network-slice-delete` | Delete SRv6 Network Slice |

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

Ask Claude to help you work with Srv6 Network Slice resources:

### Create Srv6 Network Slice

> "Create a srv6-network-slice named 'example' in the 'production' namespace"

### List Srv6 Network Slices

> "List all srv6-network-slices in the 'production' namespace"

### Get Srv6 Network Slice Details

> "Get details of the srv6-network-slice named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f srv6_network_slice.yaml

# Get
f5xcctl get srv6_network_slice {name} -n {namespace}

# List
f5xcctl get srv6_network_slices -n {namespace}

# Delete
f5xcctl delete srv6_network_slice {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_srv6_network_slice" "example" {
  name      = "example-srv6-network-slice"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
