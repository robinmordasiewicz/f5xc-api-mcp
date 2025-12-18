---
page_title: f5xc_config - f5xc-api-mcp
subcategory: Organization
description: Update LTE configuration
---

# Config

Update LTE configuration on the node

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-config-create` | Update LTE configuration |
| `f5xc-api-core-config-get` | Connector Configuration |
| `f5xc-api-core-config-list` | Get LTE configuration |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |
| `name` | Application Name |

## Example Usage

Ask Claude to help you work with Config resources:

### Create Config

> "Create a config named 'example' in the 'production' namespace"

### List Configs

> "List all configs in the 'production' namespace"

### Get Config Details

> "Get details of the config named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f config.yaml

# Get
f5xcctl get config {name} -n {namespace}

# List
f5xcctl get configs -n {namespace}

# Delete
f5xcctl delete config {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_config" "example" {
  name      = "example-config"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
