---
page_title: f5xc_script - f5xc-api-mcp
subcategory: Organization
description: List Scripts
---

# Script

List all the scripts for the tenant depending on start time and end time

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-script-create` | List Scripts |
| `f5xc-api-core-script-list` | List Scripts |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | The end_time parameter |
| `page_number` | The page_number parameter |
| `page_size` | The page_size parameter |
| `page_token` | The page_token parameter |
| `start_time` | The start_time parameter |

## Example Usage

Ask Claude to help you work with Script resources:

### Create Script

> "Create a script named 'example' in the 'production' namespace"

### List Scripts

> "List all scripts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create script -n <namespace> -i script.yaml

# Get
f5xcctl configuration get script -n <namespace> <name>

# List
f5xcctl configuration list script -n <namespace>

# Delete
f5xcctl configuration delete script -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_script" "example" {
  name      = "example-script"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
