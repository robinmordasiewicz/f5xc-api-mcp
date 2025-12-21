---
page_title: f5xc_virtual_host - f5xc-api-mcp
subcategory: Networking
description: Create Virtual Host.
---

# Virtual Host

Replace a given virtual host in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-virtual-host-create` | Create Virtual Host. |
| `f5xc-api-networking-virtual-host-get` | GET Virtual Host. |
| `f5xc-api-networking-virtual-host-list` | List Virtual Host. |
| `f5xc-api-networking-virtual-host-update` | Replace Virtual Host. |
| `f5xc-api-networking-virtual-host-delete` | DELETE Virtual Host. |

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

Ask Claude to help you work with Virtual Host resources:

### Create Virtual Host

> "Create a virtual-host named 'example' in the 'production' namespace"

### List Virtual Hosts

> "List all virtual-hosts in the 'production' namespace"

### Get Virtual Host Details

> "Get details of the virtual-host named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create virtual_host -n <namespace> -i virtual_host.yaml

# Get
f5xcctl networking get virtual_host <name> -n <namespace>

# List
f5xcctl networking list virtual_host -n <namespace>

# Delete
f5xcctl networking delete virtual_host <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_virtual_host" "example" {
  name      = "example-virtual-host"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
