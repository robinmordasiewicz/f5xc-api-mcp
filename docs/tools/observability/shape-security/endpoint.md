---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Observability
description: Report Endpoints.
---

# Endpoint

Report Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-endpoint-create` | Report Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Endpoint resources:

### Create Endpoint

> "Create a endpoint named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create endpoint -n <namespace> -i endpoint.yaml

# Get
f5xcctl observability get endpoint <name> -n <namespace>

# List
f5xcctl observability list endpoint -n <namespace>

# Delete
f5xcctl observability delete endpoint <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_endpoint" "example" {
  name      = "example-endpoint"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
