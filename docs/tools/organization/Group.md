---
page_title: f5xc_Group - f5xc-api-mcp
subcategory: Organization
description: Create group with users
---

# Group

List groups based on the given filter.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-group-create` | Create group with users |
| `f5xc-api-core-group-get` | List group based on ID |
| `f5xc-api-core-group-list` | List group based on filters |
| `f5xc-api-core-group-update` | Replace group based on ID |
| `f5xc-api-core-group-delete` | Delete group based on ID |
| `f5xc-api-core-group-patch` | Patch group based on ID |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Id |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `excludedAttributes` | The excludedAttributes parameter |
| `count` | The count parameter |
| `filter` | The filter parameter |
| `page` | The page parameter |

## Example Usage

Ask Claude to help you work with Group resources:

### Create Group

> "Create a Group named 'example' in the 'production' namespace"

### List Groups

> "List all Groups in the 'production' namespace"

### Get Group Details

> "Get details of the Group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f Group.yaml

# Get
f5xcctl get Group {name} -n {namespace}

# List
f5xcctl get Groups -n {namespace}

# Delete
f5xcctl delete Group {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_Group" "example" {
  name      = "example-Group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
