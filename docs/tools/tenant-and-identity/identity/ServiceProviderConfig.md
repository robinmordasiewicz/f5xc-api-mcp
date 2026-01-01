---
page_title: f5xc_ServiceProviderConfig - f5xc-api-mcp
subcategory: Tenant And Identity
description: List service provider configs.
---

# ServiceProviderConfig

!!! info "Low Risk"
    Operations on this resource are generally safe.

Listserviceproviderconfig CustomPublicAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-serviceproviderconfig-list` | List service provider configs. |

## Example Usage

Ask Claude to help you work with ServiceProviderConfig resources:

### List ServiceProviderConfigs

> "List all ServiceProviderConfigs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create ServiceProviderConfig -n <namespace> -i ServiceProviderConfig.yaml

# Get
xcsh tenant_and_identity get ServiceProviderConfig <name> -n <namespace>

# List
xcsh tenant_and_identity list ServiceProviderConfig -n <namespace>

# Delete
xcsh tenant_and_identity delete ServiceProviderConfig <name> -n <namespace>
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
