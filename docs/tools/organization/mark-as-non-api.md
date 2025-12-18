---
page_title: f5xc_mark_as_non_api - f5xc-api-mcp
subcategory: Organization
description: Mark As Non-API
---

# Mark As Non API

Update the API Definition's non-API list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-mark-as-non-api-create` | Mark As Non-API |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Mark As Non API resources:

### Create Mark As Non API

> "Create a mark-as-non-api named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f mark_as_non_api.yaml

# Get
f5xcctl get mark_as_non_api {name} -n {namespace}

# List
f5xcctl get mark_as_non_apis -n {namespace}

# Delete
f5xcctl delete mark_as_non_api {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_mark_as_non_api" "example" {
  name      = "example-mark-as-non-api"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
