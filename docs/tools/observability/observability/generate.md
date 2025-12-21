---
page_title: f5xc_generate - f5xc-api-mcp
subcategory: Observability
description: Generate Report Now.
---

# Generate

Generate report now.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-generate-create` | Generate Report Now. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Generate resources:

### Create Generate

> "Create a generate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create generate -n <namespace> -i generate.yaml

# Get
f5xcctl configuration get generate -n <namespace> <name>

# List
f5xcctl configuration list generate -n <namespace>

# Delete
f5xcctl configuration delete generate -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_generate" "example" {
  name      = "example-generate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
