---
page_title: f5xc_network_policy_view - f5xc-api-mcp
subcategory: Network Security
description: Create Network policy View.
---

# Network Policy View

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the Network policy view replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-policy-view-create` | Create Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-get` | GET Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-list` | List Configure Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-update` | Replace Network policy View. |
| `f5xc-api-networksecurity-network-policy-view-delete` | DELETE Configure Network policy View. |

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

- network-policy-view

**Modifies:**

- network-policy-view

**Deletes:**

- network-policy-view
- contained_resources

## Example Usage

Ask Claude to help you work with Network Policy View resources:

### Create Network Policy View

> "Create a network-policy-view named 'example' in the 'production' namespace"

### List Network Policy Views

> "List all network-policy-views in the 'production' namespace"

### Get Network Policy View Details

> "Get details of the network-policy-view named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create network_policy_view -n <namespace> -i network_policy_view.yaml

# Get
xcsh network_security get network_policy_view <name> -n <namespace>

# List
xcsh network_security list network_policy_view -n <namespace>

# Delete
xcsh network_security delete network_policy_view <name> -n <namespace>
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
