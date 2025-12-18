---
page_title: f5xc_stored_object - f5xc-api-mcp
subcategory: Organization
description: Get List Of Stored Objects
---

# Stored Object

ListObjects is an API to list objects in object store

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-stored-object-list` | Get List Of Stored Objects |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `object_type` | object_type |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `latest_version_only` | Optional query parameter. If passed, returns only latest version of the objects. |
| `name` | The name parameter |
| `query_type` | Optional query parameter. The type of search query needs to be performed. Could be EXACT_MATCH or PREFIX_MATCH. |

## Example Usage

Ask Claude to help you work with Stored Object resources:

### List Stored Objects

> "List all stored-objects in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f stored_object.yaml

# Get
f5xcctl get stored_object {name} -n {namespace}

# List
f5xcctl get stored_objects -n {namespace}

# Delete
f5xcctl delete stored_object {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_stored_object" "example" {
  name      = "example-stored-object"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
