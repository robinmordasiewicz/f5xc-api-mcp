---
page_title: f5xc_srv6_network_slice - f5xc-api-mcp
subcategory: Network
description: Create SRv6 Network Slice.
---

# Srv6 Network Slice

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace srv6_network_slice replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-srv6-network-slice-create` | Create SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-get` | GET SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-list` | List SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-update` | Replace SRv6 Network Slice. |
| `f5xc-api-network-srv6-network-slice-delete` | DELETE SRv6 Network Slice. |

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

- srv6-network-slice

**Modifies:**

- srv6-network-slice

**Deletes:**

- srv6-network-slice
- contained_resources

## Example Usage

Ask Claude to help you work with Srv6 Network Slice resources:

### Create Srv6 Network Slice

> "Create a srv6-network-slice named 'example' in the 'production' namespace"

### List Srv6 Network Slices

> "List all srv6-network-slices in the 'production' namespace"

### Get Srv6 Network Slice Details

> "Get details of the srv6-network-slice named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create srv6_network_slice -n <namespace> -i srv6_network_slice.yaml

# Get
xcsh network get srv6_network_slice <name> -n <namespace>

# List
xcsh network list srv6_network_slice -n <namespace>

# Delete
xcsh network delete srv6_network_slice <name> -n <namespace>
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
