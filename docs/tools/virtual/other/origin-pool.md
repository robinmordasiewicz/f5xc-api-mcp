---
page_title: f5xc_origin_pool - f5xc-api-mcp
subcategory: Virtual
description: Create Origin Pool.
---

# Origin Pool

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Shape of the origin pool create specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-origin-pool-create` | Create Origin Pool. |
| `f5xc-api-virtual-origin-pool-get` | GET Origin Pool. |
| `f5xc-api-virtual-origin-pool-list` | List Origin Pool. |
| `f5xc-api-virtual-origin-pool-update` | Replace Origin Pool. |
| `f5xc-api-virtual-origin-pool-delete` | DELETE Origin Pool. |

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

- origin-pool

**Modifies:**

- origin-pool

**Deletes:**

- origin-pool
- contained_resources

## Example Usage

Ask Claude to help you work with Origin Pool resources:

### Create Origin Pool

> "Create a origin-pool named 'example' in the 'production' namespace"

### List Origin Pools

> "List all origin-pools in the 'production' namespace"

### Get Origin Pool Details

> "Get details of the origin-pool named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create origin_pool -n <namespace> -i origin_pool.yaml

# Get
xcsh virtual get origin_pool <name> -n <namespace>

# List
xcsh virtual list origin_pool -n <namespace>

# Delete
xcsh virtual delete origin_pool <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_origin_pool" "example" {
  name      = "example-origin-pool"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
