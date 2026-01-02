---
page_title: f5xc_{object_type} - f5xc-api-mcp
subcategory: Object Storage
description: DELETE Stored Object(s)
---

# {object Type}

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

CreateObject is an API to upload an object to generic object store. Objects are immutable, a new
version is created when the content is updated.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-objectstorage-object-type-update` | Create Stored Object. |
| `f5xc-api-objectstorage-object-type-delete` | DELETE Stored Object(s) |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Volt-API-specs.` |
| `namespace` | Namespace | `System` |
| `object_type` | Object_type | `Swagger` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `force_delete` | Optional query parameter. If provided will DELETE all the versions of the specified object. | `Value` |
| `version` | Version of the stored_object in "v{n}-{YY}-{MM}-{DD}" formatted string, where n is version number and YY/MM/DD is year, month and date. | `V1-21-01-12.` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- stored-object

**Deletes:**

- stored-object
- contained_resources

## Example Usage

Ask Claude to help you work with {object Type} resources:

## xcsh Equivalent

```bash
# Create/Update
xcsh object_storage create {object_type} -n <namespace> -i {object_type}.yaml

# Get
xcsh object_storage get {object_type} <name> -n <namespace>

# List
xcsh object_storage list {object_type} -n <namespace>

# Delete
xcsh object_storage delete {object_type} <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_{object_type}" "example" {
  name      = "example-{object-type}"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
