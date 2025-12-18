---
page_title: f5xc_get_cloud_init_config - f5xc-api-mcp
subcategory: Organization
description: Get Cloud Init Config
---

# Get Cloud Init Config

Returns cloud-init counfig for kvm provider with jwt token

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-get-cloud-init-config-list` | Get Cloud Init Config |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `provider` | x-required |
| `site_name` | site name for this cloud-init config |

## Example Usage

Ask Claude to help you work with Get Cloud Init Config resources:

### List Get Cloud Init Configs

> "List all get-cloud-init-configs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f get_cloud_init_config.yaml

# Get
f5xcctl get get_cloud_init_config {name} -n {namespace}

# List
f5xcctl get get_cloud_init_configs -n {namespace}

# Delete
f5xcctl delete get_cloud_init_config {name} -n {namespace}
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
