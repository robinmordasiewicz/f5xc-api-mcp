---
page_title: f5xc_ServiceProviderConfig - f5xc-api-mcp
subcategory: Identity
description: List service provider configs.
---

# ServiceProviderConfig

Listserviceproviderconfig CustomPublicAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-serviceproviderconfig-list` | List service provider configs. |

## Example Usage

Ask Claude to help you work with ServiceProviderConfig resources:

### List ServiceProviderConfigs

> "List all ServiceProviderConfigs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ServiceProviderConfig -n <namespace> -i ServiceProviderConfig.yaml

# Get
f5xcctl configuration get ServiceProviderConfig -n <namespace> <name>

# List
f5xcctl configuration list ServiceProviderConfig -n <namespace>

# Delete
f5xcctl configuration delete ServiceProviderConfig -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ServiceProviderConfig" "example" {
  name      = "example-ServiceProviderConfig"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
