---
page_title: f5xc_signup - f5xc-api-mcp
subcategory: Organization
description: Signup AWS Account
---

# Signup

Get allows users to query signup and its status. Use this to query for a status of a submitted
signup object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-signup-create` | Signup AWS Account |
| `f5xc-api-core-signup-get` | Read Signup |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Signup name |

## Example Usage

Ask Claude to help you work with Signup resources:

### Create Signup

> "Create a signup named 'example' in the 'production' namespace"

### Get Signup Details

> "Get details of the signup named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f signup.yaml

# Get
f5xcctl get signup {name} -n {namespace}

# List
f5xcctl get signups -n {namespace}

# Delete
f5xcctl delete signup {name} -n {namespace}
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
