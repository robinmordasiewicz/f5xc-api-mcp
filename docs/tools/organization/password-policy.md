---
page_title: f5xc_password_policy - f5xc-api-mcp
subcategory: Organization
description: GetPasswordPolicy
---

# Password Policy

GetPasswordPolicy returns password policy for tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-password-policy-list` | GetPasswordPolicy |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `realm_id` | The realm_id parameter |

## Example Usage

Ask Claude to help you work with Password Policy resources:

### List Password Policys

> "List all password-policys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create password_policy -n <namespace> -i password_policy.yaml

# Get
f5xcctl configuration get password_policy -n <namespace> <name>

# List
f5xcctl configuration list password_policy -n <namespace>

# Delete
f5xcctl configuration delete password_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_password_policy" "example" {
  name      = "example-password-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
