---
page_title: f5xc_ike1 - f5xc-api-mcp
subcategory: Network
description: Create IKE Phase1 Profile.
---

# Ike1

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the IKE Phase1 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-ike1-create` | Create IKE Phase1 Profile. |
| `f5xc-api-network-ike1-get` | GET IKE Phase1 profile configuration. |
| `f5xc-api-network-ike1-list` | List IKE Phase 1 Profile. |
| `f5xc-api-network-ike1-update` | Replace IKE Phase1 Profile configuration. |
| `f5xc-api-network-ike1-delete` | DELETE IKE Phase 1 Profile. |

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

- ike1

**Modifies:**

- ike1

**Deletes:**

- ike1
- contained_resources

## Example Usage

Ask Claude to help you work with Ike1 resources:

### Create Ike1

> "Create a ike1 named 'example' in the 'production' namespace"

### List Ike1s

> "List all ike1s in the 'production' namespace"

### Get Ike1 Details

> "Get details of the ike1 named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create ike1 -n <namespace> -i ike1.yaml

# Get
xcsh network get ike1 <name> -n <namespace>

# List
xcsh network list ike1 -n <namespace>

# Delete
xcsh network delete ike1 <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ike1" "example" {
  name      = "example-ike1"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
