---
page_title: f5xc_Group - f5xc-api-mcp
subcategory: Identity
description: Create group with users.
---

# Group

List groups based on the given filter.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-identity-group-create` | Create group with users. |
| `f5xc-api-identity-group-get` | List group based on ID. |
| `f5xc-api-identity-group-list` | List group based on filters. |
| `f5xc-api-identity-group-update` | Replace group based on ID. |
| `f5xc-api-identity-group-delete` | DELETE group based on ID. |
| `f5xc-api-identity-group-patch` | PATCH group based on ID. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `excludedAttributes` | Members"]" |
| `count` | The number of entries after filter. |
| `filter` | Filter to be used for filtering objects. |
| `page` | Start offset. |

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
f5xcctl identity create Group -n <namespace> -i Group.yaml

# Get
f5xcctl identity get Group <name> -n <namespace>

# List
f5xcctl identity list Group -n <namespace>

# Delete
f5xcctl identity delete Group <name> -n <namespace>
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
