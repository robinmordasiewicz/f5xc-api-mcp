---
page_title: f5xc_validate_registration - f5xc-api-mcp
subcategory: Tenant And Identity
description: Validate Registration.
---

# Validate Registration

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

ValidateRegistration validates if the signup registration request is valid when a new customer
attempts to signup.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-validate-registration-create` | Validate Registration. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- validate-registration

## Example Usage

Ask Claude to help you work with Validate Registration resources:

### Create Validate Registration

> "Create a validate-registration named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl default validate-registration create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl default validate-registration create {name} --namespace {namespace}
```

Create validate-registration

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create validate_registration -n <namespace> -i validate_registration.yaml

# Get
f5xcctl tenant_and_identity get validate_registration <name> -n <namespace>

# List
f5xcctl tenant_and_identity list validate_registration -n <namespace>

# Delete
f5xcctl tenant_and_identity delete validate_registration <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_validate_registration" "example" {
  name      = "example-validate-registration"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
