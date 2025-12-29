---
page_title: f5xc_test - f5xc-api-mcp
subcategory: Statistics
description: Test Alert Receiver.
---

# Test

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API to send test alert.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-test-create` | Test Alert Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Slack1` |
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- test

## Example Usage

Ask Claude to help you work with Test resources:

### Create Test

> "Create a test named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl alert test create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl alert test create {name} --namespace {namespace}
```

Create test

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create test -n <namespace> -i test.yaml

# Get
f5xcctl statistics get test <name> -n <namespace>

# List
f5xcctl statistics list test -n <namespace>

# Delete
f5xcctl statistics delete test <name> -n <namespace>
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
