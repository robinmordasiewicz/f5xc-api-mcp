---
page_title: f5xc_{object_type} - f5xc-api-mcp
subcategory: Integrations
description: DELETE Stored Object(s)
---

# {object Type}

CreateObject is an API to upload an object to generic object store. Objects are immutable, a new
version is created when the content is updated.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-object-type-update` | Create Stored Object. |
| `f5xc-api-integrations-object-type-delete` | DELETE Stored Object(s) |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `object_type` | Object_type |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `force_delete` | Optional query parameter. If provided will DELETE all the versions of the specified object. |
| `version` | Version of the stored_object in "v{n}-{YY}-{MM}-{DD}" formatted string, where n is version number and YY/MM/DD is year, month and date. |

## Example Usage

Ask Claude to help you work with {object Type} resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create {object_type} -n <namespace> -i {object_type}.yaml

# Get
f5xcctl configuration get {object_type} -n <namespace> <name>

# List
f5xcctl configuration list {object_type} -n <namespace>

# Delete
f5xcctl configuration delete {object_type} -n <namespace> <name>
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
