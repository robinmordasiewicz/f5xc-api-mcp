---
page_title: f5xc_analysi - f5xc-api-mcp
subcategory: Organization
description: Update FormField Analysis
---

# Analysi

Mark / unmark field sensitivity by customer

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-analysi-create` | Update FormField Analysis |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Analysi resources:

### Create Analysi

> "Create a analysi named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f analysi.yaml

# Get
f5xcctl get analysi {name} -n {namespace}

# List
f5xcctl get analysis -n {namespace}

# Delete
f5xcctl delete analysi {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_analysi" "example" {
  name      = "example-analysi"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
