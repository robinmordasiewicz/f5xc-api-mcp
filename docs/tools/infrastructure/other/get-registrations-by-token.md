---
page_title: f5xc_get_registrations_by_token - f5xc-api-mcp
subcategory: Infrastructure
description: GET Registration UID by Site Token.
---

# Get Registrations By Token

Returns list of registration uids that are using particular site token.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-get-registrations-by-token-create` | GET Registration UID by Site Token. |

## Example Usage

Ask Claude to help you work with Get Registrations By Token resources:

### Create Get Registrations By Token

> "Create a get-registrations-by-token named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create get_registrations_by_token -n <namespace> -i get_registrations_by_token.yaml

# Get
f5xcctl infrastructure get get_registrations_by_token <name> -n <namespace>

# List
f5xcctl infrastructure list get_registrations_by_token -n <namespace>

# Delete
f5xcctl infrastructure delete get_registrations_by_token <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_registrations_by_token" "example" {
  name      = "example-get-registrations-by-token"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
