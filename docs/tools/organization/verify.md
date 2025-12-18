---
page_title: f5xc_verify - f5xc-api-mcp
subcategory: Organization
description: Verify Alert Receiver
---

# Verify

API to send request to verify Alert Receiver - applicable only for email and sms

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-verify-create` | Verify Alert Receiver |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Verify resources:

### Create Verify

> "Create a verify named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f verify.yaml

# Get
f5xcctl get verify {name} -n {namespace}

# List
f5xcctl get verifys -n {namespace}

# Delete
f5xcctl delete verify {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_verify" "example" {
  name      = "example-verify"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
