---
page_title: f5xc_validate_contact - f5xc-api-mcp
subcategory: Tenant And Identity
description: Validate contact.
---

# Validate Contact

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

It validates that:

* the provided country and zip code are not empty
* the provided country is in
the configured list of countries
* a provided zip code matches a regexp for a given country.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-validate-contact-create` | Validate contact. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

* validate-contact

## Example Usage

Ask Claude to help you work with Validate Contact resources:

### Create Validate Contact

> "Create a validate-contact named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create validate_contact -n <namespace> -i validate_contact.yaml

# Get
xcsh tenant_and_identity get validate_contact <name> -n <namespace>

# List
xcsh tenant_and_identity list validate_contact -n <namespace>

# Delete
xcsh tenant_and_identity delete validate_contact <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_validate_contact" "example" {
  name      = "example-validate-contact"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
