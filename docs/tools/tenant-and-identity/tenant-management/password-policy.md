---
page_title: f5xc_password_policy - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetPasswordPolicy.
---

# Password Policy

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetPasswordPolicy returns password policy for tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-password-policy-list` | GetPasswordPolicy. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `realm_id` | User's email. | `3d05688b-f560-4f70-9af1-384a0ec0ff15.` |

## Example Usage

Ask Claude to help you work with Password Policy resources:

### List Password Policys

> "List all password-policys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create password_policy -n <namespace> -i password_policy.yaml

# Get
xcsh tenant_and_identity get password_policy <name> -n <namespace>

# List
xcsh tenant_and_identity list password_policy -n <namespace>

# Delete
xcsh tenant_and_identity delete password_policy <name> -n <namespace>
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
