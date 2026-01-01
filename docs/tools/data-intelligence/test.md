---
page_title: f5xc_test - f5xc-api-mcp
subcategory: Data Intelligence
description: Test Receiver.
---

# Test

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to test receiver destination sink connection.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-test-create` | Test Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `Splunk-cloud-receiver.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- test

## Example Usage

Ask Claude to help you work with Test resources:

### Create Test

> "Create a test named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh data_intelligence create test -n <namespace> -i test.yaml

# Get
xcsh data_intelligence get test <name> -n <namespace>

# List
xcsh data_intelligence list test -n <namespace>

# Delete
xcsh data_intelligence delete test <name> -n <namespace>
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
