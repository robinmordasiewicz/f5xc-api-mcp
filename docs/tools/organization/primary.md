---
page_title: f5xc_primary - f5xc-api-mcp
subcategory: Organization
description: Make credit card primary
---

# Primary

Flags a payment method as primary. Nothing changes is the payment method is already primary, if the
payment method is secondary then it becomes default and there will be no secondary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-primary-create` | Make credit card primary |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Primary resources:

### Create Primary

> "Create a primary named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f primary.yaml

# Get
f5xcctl get primary {name} -n {namespace}

# List
f5xcctl get primarys -n {namespace}

# Delete
f5xcctl delete primary {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_primary" "example" {
  name      = "example-primary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
