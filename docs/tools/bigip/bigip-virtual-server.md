---
page_title: f5xc_bigip_virtual_server - f5xc-api-mcp
subcategory: BIG-IP Integration
description: GET BIG-IP virtual server.
---

# Bigip Virtual Server

List the set of bigip_virtual_server in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-bigip-virtual-server-get` | GET BIG-IP virtual server. |
| `f5xc-api-bigip-bigip-virtual-server-list` | List BIG-IP virtual server. |
| `f5xc-api-bigip-bigip-virtual-server-update` | Replace BIG-IP virtual server. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |
| `metadata.namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Bigip Virtual Server resources:

### List Bigip Virtual Servers

> "List all bigip-virtual-servers in the 'production' namespace"

### Get Bigip Virtual Server Details

> "Get details of the bigip-virtual-server named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl bigip create bigip_virtual_server -n <namespace> -i bigip_virtual_server.yaml

# Get
f5xcctl bigip get bigip_virtual_server <name> -n <namespace>

# List
f5xcctl bigip list bigip_virtual_server -n <namespace>

# Delete
f5xcctl bigip delete bigip_virtual_server <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bigip_virtual_server" "example" {
  name      = "example-bigip-virtual-server"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
