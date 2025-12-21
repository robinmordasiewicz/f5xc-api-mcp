---
page_title: f5xc_{name} - f5xc-api-mcp
subcategory: Integrations
description: DELETE Stored Object(s)
---

# {name}

GetMobileAppShield is an API to download particular version of mobile app shield.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-name-get` | GET Mobile App Shield. |
| `f5xc-api-integrations-name-delete` | DELETE Stored Object(s) |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `version` | Version |
| `object_type` | Object_type |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `object_type` | X-required |
| `force_delete` | Optional query parameter. If provided will DELETE all the versions of the specified object. |

## Example Usage

Ask Claude to help you work with {name} resources:

### Get {name} Details

> "Get details of the {name} named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl integrations create {name} -n <namespace> -i {name}.yaml

# Get
f5xcctl integrations get {name} <name> -n <namespace>

# List
f5xcctl integrations list {name} -n <namespace>

# Delete
f5xcctl integrations delete {name} <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_{name}" "example" {
  name      = "example-{name}"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
