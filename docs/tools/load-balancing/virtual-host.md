---
page_title: f5xc_virtual_host - f5xc-api-mcp
subcategory: Load Balancing
description: Create Virtual Host
---

# Virtual Host

Replace a given virtual host in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-virtual-host-create` | Create Virtual Host |
| `f5xc-api-core-virtual-host-get` | Get Virtual Host |
| `f5xc-api-core-virtual-host-list` | List Virtual Host |
| `f5xc-api-core-virtual-host-update` | Replace Virtual Host |
| `f5xc-api-core-virtual-host-delete` | Delete Virtual Host |

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
f5xcctl configuration create virtual_host -n <namespace> -i virtual_host.yaml

# Get
f5xcctl configuration get virtual_host -n <namespace> <name>

# List
f5xcctl configuration list virtual_host -n <namespace>

# Delete
f5xcctl configuration delete virtual_host -n <namespace> <name>
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
