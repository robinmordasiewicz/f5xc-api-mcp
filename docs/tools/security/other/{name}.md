---
page_title: f5xc_{name} - f5xc-api-mcp
subcategory: Security
description: GET Mobile SDK.
---

# {name}

GetMobileSDK is an API to download particular version of SDK.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-name-get` | GET Mobile SDK. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `version` | Version |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `object_type` | X-required |

## Example Usage

Ask Claude to help you work with {name} resources:

### Get {name} Details

> "Get details of the {name} named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create {name} -n <namespace> -i {name}.yaml

# Get
f5xcctl configuration get {name} -n <namespace> <name>

# List
f5xcctl configuration list {name} -n <namespace>

# Delete
f5xcctl configuration delete {name} -n <namespace> <name>
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
