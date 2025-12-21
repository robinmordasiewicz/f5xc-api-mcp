---
page_title: f5xc_by_mitigation - f5xc-api-mcp
subcategory: Observability
description: L3l4 Mitigation Traffic Query.
---

# By Mitigation

Request to GET l3l4 Mitigation Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-by-mitigation-create` | L3l4 Mitigation Traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `mitigation_id` | MitigationId |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with By Mitigation resources:

### Create By Mitigation

> "Create a by-mitigation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create by_mitigation -n <namespace> -i by_mitigation.yaml

# Get
f5xcctl observability get by_mitigation <name> -n <namespace>

# List
f5xcctl observability list by_mitigation -n <namespace>

# Delete
f5xcctl observability delete by_mitigation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_by_mitigation" "example" {
  name      = "example-by-mitigation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
