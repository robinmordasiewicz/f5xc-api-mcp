---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Organization
description: Add Event Detail
---

# Detail

Returns a list of event details. The list contains event details entered by customer and the SOC
team members, mitigation annotations and any attachments.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-detail-create` | Add Event Detail |
| `f5xc-api-core-detail-list` | List of event details |
| `f5xc-api-core-detail-update` | Edit event detail |
| `f5xc-api-core-detail-delete` | Delete event detail |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `event_id` | Event ID |
| `namespace` | Namespace |
| `event_detail_id` | Event Detail ID |

## Example Usage

Ask Claude to help you work with Detail resources:

### Create Detail

> "Create a detail named 'example' in the 'production' namespace"

### List Details

> "List all details in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f detail.yaml

# Get
f5xcctl get detail {name} -n {namespace}

# List
f5xcctl get details -n {namespace}

# Delete
f5xcctl delete detail {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_detail" "example" {
  name      = "example-detail"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
