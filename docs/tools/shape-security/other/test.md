---
page_title: f5xc_test - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Test Receiver.
---

# Test

API to test receiver destination sink connection.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-test-create` | Test Receiver. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Test resources:

### Create Test

> "Create a test named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create test -n <namespace> -i test.yaml

# Get
f5xcctl shape_security get test <name> -n <namespace>

# List
f5xcctl shape_security list test -n <namespace>

# Delete
f5xcctl shape_security delete test <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_test" "example" {
  name      = "example-test"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
