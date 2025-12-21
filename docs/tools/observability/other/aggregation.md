---
page_title: f5xc_aggregation - f5xc-api-mcp
subcategory: Observability
description: Access Log Aggregation Query.
---

# Aggregation

Request to GET summary/analytics data for the access logs that matches the query in request for a
given namespace.
Typically, virtual host is specified as match condition in the request to GET the
aggregaation data
for a virtual host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-aggregation-create` | Access Log Aggregation Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Aggregation resources:

### Create Aggregation

> "Create a aggregation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create aggregation -n <namespace> -i aggregation.yaml

# Get
f5xcctl observability get aggregation <name> -n <namespace>

# List
f5xcctl observability list aggregation -n <namespace>

# Delete
f5xcctl observability delete aggregation <name> -n <namespace>
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
