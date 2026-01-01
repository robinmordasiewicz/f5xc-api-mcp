---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Shape
description: Report Endpoints.
---

# Endpoint

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Report Endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-endpoint-create` | Report Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- endpoint

## Example Usage

Ask Claude to help you work with Endpoint resources:

### Create Endpoint

> "Create a endpoint named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create endpoint -n <namespace> -i endpoint.yaml

# Get
xcsh shape get endpoint <name> -n <namespace>

# List
xcsh shape list endpoint -n <namespace>

# Delete
xcsh shape delete endpoint <name> -n <namespace>
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
