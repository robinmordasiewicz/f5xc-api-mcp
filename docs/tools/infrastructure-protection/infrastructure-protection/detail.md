---
page_title: f5xc_detail - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Add Event Detail.
---

# Detail

Returns a list of event details. The list contains event details entered by customer and the SOC
team members, mitigation annotations and any attachments.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-detail-create` | Add Event Detail. |
| `f5xc-api-infrastructureprotection-detail-list` | List of event details. |
| `f5xc-api-infrastructureprotection-detail-update` | Edit event detail. |
| `f5xc-api-infrastructureprotection-detail-delete` | DELETE event detail. |

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
f5xcctl infrastructure_protection create detail -n <namespace> -i detail.yaml

# Get
f5xcctl infrastructure_protection get detail <name> -n <namespace>

# List
f5xcctl infrastructure_protection list detail -n <namespace>

# Delete
f5xcctl infrastructure_protection delete detail <name> -n <namespace>
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
