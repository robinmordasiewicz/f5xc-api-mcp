---
page_title: f5xc_stored_object - f5xc-api-mcp
subcategory: Integrations
description: GET List Of Stored Objects.
---

# Stored Object

ListObjects is an API to list objects in object store.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-stored-object-list` | GET List Of Stored Objects. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `object_type` | Object_type |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `latest_version_only` | Optional query parameter. If passed, returns only latest version of the objects. |
| `name` | Optional query parameter. Name of the stored_object. |
| `query_type` | Optional query parameter. The type of search query needs to be performed. Could be EXACT_MATCH or PREFIX_MATCH. |

## Example Usage

Ask Claude to help you work with Stored Object resources:

### List Stored Objects

> "List all stored-objects in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create stored_object -n <namespace> -i stored_object.yaml

# Get
f5xcctl configuration get stored_object -n <namespace> <name>

# List
f5xcctl configuration list stored_object -n <namespace>

# Delete
f5xcctl configuration delete stored_object -n <namespace> <name>
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
