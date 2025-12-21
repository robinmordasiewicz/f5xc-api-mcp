---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Observability
description: GET Synthetic Monitoring Health Check.
---

# Health

Returns 200 Ok if the service is healthy.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-health-list` | GET Synthetic Monitoring Health Check. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Health resources:

### List Healths

> "List all healths in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create health -n <namespace> -i health.yaml

# Get
f5xcctl observability get health <name> -n <namespace>

# List
f5xcctl observability list health -n <namespace>

# Delete
f5xcctl observability delete health <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_health" "example" {
  name      = "example-health"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
