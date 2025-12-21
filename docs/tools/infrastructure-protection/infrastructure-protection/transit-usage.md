---
page_title: f5xc_transit_usage - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Transit Usage.
---

# Transit Usage

API to GET transit usage data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-transit-usage-create` | Transit Usage. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Transit Usage resources:

### Create Transit Usage

> "Create a transit-usage named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create transit_usage -n <namespace> -i transit_usage.yaml

# Get
f5xcctl infrastructure_protection get transit_usage <name> -n <namespace>

# List
f5xcctl infrastructure_protection list transit_usage -n <namespace>

# Delete
f5xcctl infrastructure_protection delete transit_usage <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transit_usage" "example" {
  name      = "example-transit-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
