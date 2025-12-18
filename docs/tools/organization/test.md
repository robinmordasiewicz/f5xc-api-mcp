---
page_title: f5xc_test - f5xc-api-mcp
subcategory: Organization
description: Test Alert Receiver
---

# Test

API to send test alert

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-test-create` | Test Alert Receiver |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Test resources:

### Create Test

> "Create a test named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f test.yaml

# Get
f5xcctl get test {name} -n {namespace}

# List
f5xcctl get tests -n {namespace}

# Delete
f5xcctl delete test {name} -n {namespace}
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
