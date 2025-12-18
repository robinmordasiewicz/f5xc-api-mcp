---
page_title: f5xc_list - f5xc-api-mcp
subcategory: Organization
description: All Protected Endpoints
---

# List

Get All Protected Endpoints

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-list-create` | All Protected Endpoints |
| `f5xc-api-core-list-list` | List USB devices |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with List resources:

### Create List

> "Create a list named 'example' in the 'production' namespace"

### List Lists

> "List all lists in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f list.yaml

# Get
f5xcctl get list {name} -n {namespace}

# List
f5xcctl get lists -n {namespace}

# Delete
f5xcctl delete list {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_list" "example" {
  name      = "example-list"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
