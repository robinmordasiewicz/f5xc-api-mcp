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
f5xcctl identity create ServiceProviderConfig -n <namespace> -i ServiceProviderConfig.yaml

# Get
f5xcctl identity get ServiceProviderConfig <name> -n <namespace>

# List
f5xcctl identity list ServiceProviderConfig -n <namespace>

# Delete
f5xcctl identity delete ServiceProviderConfig <name> -n <namespace>
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
