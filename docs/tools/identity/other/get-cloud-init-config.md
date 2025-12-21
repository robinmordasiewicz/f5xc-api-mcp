---
page_title: f5xc_get_cloud_init_config - f5xc-api-mcp
subcategory: Identity
description: GET Cloud Init Config.
---

# Get Cloud Init Config

Returns cloud-init counfig for kvm provider with JWT token.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-get-cloud-init-config-list` | GET Cloud Init Config. |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `provider` | Provider for that cloud-init config. |
| `site_name` | Site name for this cloud-init config. |

## Example Usage

Ask Claude to help you work with Get Cloud Init Config resources:

### List Get Cloud Init Configs

> "List all get-cloud-init-configs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create get_cloud_init_config -n <namespace> -i get_cloud_init_config.yaml

# Get
f5xcctl configuration get get_cloud_init_config -n <namespace> <name>

# List
f5xcctl configuration list get_cloud_init_config -n <namespace>

# Delete
f5xcctl configuration delete get_cloud_init_config -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_get_cloud_init_config" "example" {
  name      = "example-get-cloud-init-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
