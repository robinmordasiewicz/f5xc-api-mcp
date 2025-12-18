---
page_title: f5xc_aggregation - f5xc-api-mcp
subcategory: Organization
description: Alerts History Aggregation
---

# Aggregation

Get summary/aggregation data for alerts in the given namespace.
For `system` namespace, all alerts
for the tenant matching the query specified
in the request will be considered for aggregation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-aggregation-create` | Alerts History Aggregation |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Aggregation resources:

### Create Aggregation

> "Create a aggregation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f aggregation.yaml

# Get
f5xcctl get aggregation {name} -n {namespace}

# List
f5xcctl get aggregations -n {namespace}

# Delete
f5xcctl delete aggregation {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_aggregation" "example" {
  name      = "example-aggregation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
