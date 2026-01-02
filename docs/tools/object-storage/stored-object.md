---
page_title: f5xc_stored_object - f5xc-api-mcp
subcategory: Object Storage
description: GET List Of Stored Objects.
---

# Stored Object

!!! info "Low Risk"
    Operations on this resource are generally safe.

ListObjects is an API to list objects in object store.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-objectstorage-stored-object-list` | GET List Of Stored Objects. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `object_type` | Object_type | `Swagger` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `latest_version_only` | Optional query parameter. If passed, returns only latest version of the objects. | `-` |
| `name` | Optional query parameter. Name of the stored_object. | `Example-file, shared/example-file, example-ns/example-file.` |
| `query_type` | Optional query parameter. The type of search query needs to be performed. Could be EXACT_MATCH or PREFIX_MATCH. | `-` |

## Example Usage

Ask Claude to help you work with Stored Object resources:

### List Stored Objects

> "List all stored-objects in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh object_storage create stored_object -n <namespace> -i stored_object.yaml

# Get
xcsh object_storage get stored_object <name> -n <namespace>

# List
xcsh object_storage list stored_object -n <namespace>

# Delete
xcsh object_storage delete stored_object <name> -n <namespace>
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
