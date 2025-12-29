---
page_title: f5xc_health - f5xc-api-mcp
subcategory: Support
description: Health
---

# Health

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET VPM health information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-health-list` | Health |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site Name | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `console_user` | Name of the console user who runs this command. | `Console-user.` |

## Example Usage

Ask Claude to help you work with Health resources:

### List Healths

> "List all healths in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate health list --namespace {namespace}
```

List all healths

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create health -n <namespace> -i health.yaml

# Get
f5xcctl support get health <name> -n <namespace>

# List
f5xcctl support list health -n <namespace>

# Delete
f5xcctl support delete health <name> -n <namespace>
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
