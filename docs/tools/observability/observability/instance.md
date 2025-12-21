---
page_title: f5xc_instance - f5xc-api-mcp
subcategory: Observability
description: Service Instance Query.
---

# Instance

Request to GET time-series data for a service instance.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-instance-create` | Service Instance Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Instance resources:

### Create Instance

> "Create a instance named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create instance -n <namespace> -i instance.yaml

# Get
f5xcctl observability get instance <name> -n <namespace>

# List
f5xcctl observability list instance -n <namespace>

# Delete
f5xcctl observability delete instance <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_instance" "example" {
  name      = "example-instance"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
