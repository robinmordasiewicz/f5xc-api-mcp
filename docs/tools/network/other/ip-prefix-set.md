---
page_title: f5xc_ip_prefix_set - f5xc-api-mcp
subcategory: Network
description: Create IP Prefix Set.
---

# IP Prefix Set

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace ip_prefix_set replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ip-prefix-set-create` | Create IP Prefix Set. |
| `f5xc-api-network-ip-prefix-set-get` | GET IP Prefix Set. |
| `f5xc-api-network-ip-prefix-set-list` | List IP Prefix Set. |
| `f5xc-api-network-ip-prefix-set-update` | Replace IP Prefix Set. |
| `f5xc-api-network-ip-prefix-set-delete` | DELETE IP Prefix Set. |

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

- ip-prefix-set

**Modifies:**

- ip-prefix-set

**Deletes:**

- ip-prefix-set
- contained_resources

## Example Usage

Ask Claude to help you work with IP Prefix Set resources:

### Create IP Prefix Set

> "Create a ip-prefix-set named 'example' in the 'production' namespace"

### List IP Prefix Sets

> "List all ip-prefix-sets in the 'production' namespace"

### Get IP Prefix Set Details

> "Get details of the ip-prefix-set named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create ip_prefix_set -n <namespace> -i ip_prefix_set.yaml

# Get
xcsh network get ip_prefix_set <name> -n <namespace>

# List
xcsh network list ip_prefix_set -n <namespace>

# Delete
xcsh network delete ip_prefix_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ip_prefix_set" "example" {
  name      = "example-ip-prefix-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
