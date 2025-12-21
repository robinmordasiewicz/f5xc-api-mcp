---
page_title: f5xc_validate_contact - f5xc-api-mcp
subcategory: Identity
description: Validate contact.
---

# Validate Contact

It validates that:

* the provided country and zip code are not empty
* the provided country is in
the configured list of countries
* a provided zip code matches a regexp for a given country.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-validate-contact-create` | Validate contact. |

## Example Usage

Ask Claude to help you work with Validate Contact resources:

### Create Validate Contact

> "Create a validate-contact named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create validate_contact -n <namespace> -i validate_contact.yaml

# Get
f5xcctl configuration get validate_contact -n <namespace> <name>

# List
f5xcctl configuration list validate_contact -n <namespace>

# Delete
f5xcctl configuration delete validate_contact -n <namespace> <name>
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
