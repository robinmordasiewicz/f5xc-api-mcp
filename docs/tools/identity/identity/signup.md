---
page_title: f5xc_signup - f5xc-api-mcp
subcategory: Identity
description: Read Signup.
---

# Signup

GET allows users to query signup and its status. Use this to query for a status of a submitted
signup object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-signup-get` | Read Signup. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Signup name |

## Example Usage

Ask Claude to help you work with Signup resources:

### Get Signup Details

> "Get details of the signup named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl identity create signup -n <namespace> -i signup.yaml

# Get
f5xcctl identity get signup <name> -n <namespace>

# List
f5xcctl identity list signup -n <namespace>

# Delete
f5xcctl identity delete signup <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_signup" "example" {
  name      = "example-signup"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
