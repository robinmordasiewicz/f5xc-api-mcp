---
page_title: f5xc_http_monitors_health - f5xc-api-mcp
subcategory: Monitoring
description: Get HTTP Monitor Health
---

# HTTP Monitors Health

Returns list of HTTP monitors in namespace with corresponding region health(s)

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-http-monitors-health-create` | Get HTTP Monitor Health |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with HTTP Monitors Health resources:

### Create HTTP Monitors Health

> "Create a http-monitors-health named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create http_monitors_health -n <namespace> -i http_monitors_health.yaml

# Get
f5xcctl configuration get http_monitors_health -n <namespace> <name>

# List
f5xcctl configuration list http_monitors_health -n <namespace>

# Delete
f5xcctl configuration delete http_monitors_health -n <namespace> <name>
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
