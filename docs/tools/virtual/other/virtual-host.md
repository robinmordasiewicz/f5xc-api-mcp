---
page_title: f5xc_virtual_host - f5xc-api-mcp
subcategory: Virtual
description: Create Virtual Host.
---

# Virtual Host

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a given virtual host in a given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-virtual-host-create` | Create Virtual Host. |
| `f5xc-api-virtual-virtual-host-get` | GET Virtual Host. |
| `f5xc-api-virtual-virtual-host-list` | List Virtual Host. |
| `f5xc-api-virtual-virtual-host-update` | Replace Virtual Host. |
| `f5xc-api-virtual-virtual-host-delete` | DELETE Virtual Host. |

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

- virtual-host

**Modifies:**

- virtual-host

**Deletes:**

- virtual-host
- contained_resources

## Example Usage

Ask Claude to help you work with Virtual Host resources:

### Create Virtual Host

> "Create a virtual-host named 'example' in the 'production' namespace"

### List Virtual Hosts

> "List all virtual-hosts in the 'production' namespace"

### Get Virtual Host Details

> "Get details of the virtual-host named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create virtual_host -n <namespace> -i virtual_host.yaml

# Get
xcsh virtual get virtual_host <name> -n <namespace>

# List
xcsh virtual list virtual_host -n <namespace>

# Delete
xcsh virtual delete virtual_host <name> -n <namespace>
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
