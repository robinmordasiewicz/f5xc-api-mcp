---
page_title: f5xc_script - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: List Scripts.
---

# Script

List all the scripts for the tenant depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-script-create` | List Scripts. |
| `f5xc-api-shapesecurity-script-list` | List Scripts. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | X-required |
| `page_number` | One-indexed page number (starts from 1), page_number and page_size are optional when page_token is specified. |
| `page_size` | The maximum number of scripts to return per page. |
| `page_token` | Page_token is the value of listscriptsresponse.next_page_token from previous request. |
| `start_time` | X-required |

## Example Usage

Ask Claude to help you work with Script resources:

### Create Script

> "Create a script named 'example' in the 'production' namespace"

### List Scripts

> "List all scripts in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create script -n <namespace> -i script.yaml

# Get
f5xcctl shape_security get script <name> -n <namespace>

# List
f5xcctl shape_security list script -n <namespace>

# Delete
f5xcctl shape_security delete script <name> -n <namespace>
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
