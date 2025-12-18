---
page_title: f5xc_{object_type} - f5xc-api-mcp
subcategory: Organization
description: Delete Stored Object(s)
---

# {object Type}

CreateObject is an API to upload an object to generic object store. Objects are immutable, a new
version is created when the content is updated.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-object-type-update` | Create Stored Object |
| `f5xc-api-core-object-type-delete` | Delete Stored Object(s) |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |
| `object_type` | object_type |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `force_delete` | The force_delete parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with {object Type} resources:

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f {object_type}.yaml

# Get
f5xcctl get {object_type} {name} -n {namespace}

# List
f5xcctl get {object_type}s -n {namespace}

# Delete
f5xcctl delete {object_type} {name} -n {namespace}
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
