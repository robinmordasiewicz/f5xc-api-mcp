---
page_title: f5xc_ServiceProviderConfig - f5xc-api-mcp
subcategory: Organization
description: List service provider configs
---

# ServiceProviderConfig

List service provider configs

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-serviceproviderconfig-list` | List service provider configs |

## Example Usage

Ask Claude to help you work with ServiceProviderConfig resources:

### List ServiceProviderConfigs

> "List all ServiceProviderConfigs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f ServiceProviderConfig.yaml

# Get
f5xcctl get ServiceProviderConfig {name} -n {namespace}

# List
f5xcctl get ServiceProviderConfigs -n {namespace}

# Delete
f5xcctl delete ServiceProviderConfig {name} -n {namespace}
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
