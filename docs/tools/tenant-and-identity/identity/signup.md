---
page_title: f5xc_signup - f5xc-api-mcp
subcategory: Tenant And Identity
description: Read Signup.
---

# Signup

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET allows users to query signup and its status. Use this to query for a status of a submitted
signup object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-signup-get` | Read Signup. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Signup name | `Signup-1234-5678-9012-3456.` |

## Example Usage

Ask Claude to help you work with Signup resources:

### Get Signup Details

> "Get details of the signup named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create signup -n <namespace> -i signup.yaml

# Get
xcsh tenant_and_identity get signup <name> -n <namespace>

# List
xcsh tenant_and_identity list signup -n <namespace>

# Delete
xcsh tenant_and_identity delete signup <name> -n <namespace>
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
