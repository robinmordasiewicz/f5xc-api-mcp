---
page_title: f5xc_http_monitors_health - f5xc-api-mcp
subcategory: Observability
description: GET HTTP Monitor Health.
---

# HTTP Monitors Health

Returns list of HTTP monitors in namespace with corresponding region health(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-http-monitors-health-create` | GET HTTP Monitor Health. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with HTTP Monitors Health resources:

### Create HTTP Monitors Health

> "Create a http-monitors-health named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create http_monitors_health -n <namespace> -i http_monitors_health.yaml

# Get
f5xcctl observability get http_monitors_health <name> -n <namespace>

# List
f5xcctl observability list http_monitors_health -n <namespace>

# Delete
f5xcctl observability delete http_monitors_health <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_http_monitors_health" "example" {
  name      = "example-http-monitors-health"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
