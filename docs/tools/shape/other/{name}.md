---
page_title: f5xc_{name} - f5xc-api-mcp
subcategory: Shape
description: GET Mobile SDK.
---

# {name}

!!! info "Low Risk"
    Operations on this resource are generally safe.

GetMobileSDK is an API to download particular version of SDK.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-name-get` | GET Mobile SDK. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Volt-API-specs.` |
| `namespace` | Namespace | `System` |
| `version` | Version | `V0-21-09-13.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `object_type` | X-required | `Swagger` |

## Example Usage

Ask Claude to help you work with {name} resources:

### Get {name} Details

> "Get details of the {name} named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl object_store mobile-sdk get {name} --namespace {namespace}
```

Get specific mobile-sdk

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create {name} -n <namespace> -i {name}.yaml

# Get
f5xcctl shape get {name} <name> -n <namespace>

# List
f5xcctl shape list {name} -n <namespace>

# Delete
f5xcctl shape delete {name} <name> -n <namespace>
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
