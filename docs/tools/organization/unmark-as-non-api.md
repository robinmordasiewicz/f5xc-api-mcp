---
page_title: f5xc_unmark_as_non_api - f5xc-api-mcp
subcategory: Organization
description: Unmark As Non-API
---

# Unmark As Non API

Delete the provided API endpoints from the API Definition's non-API list.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-unmark-as-non-api-create` | Unmark As Non-API |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Unmark As Non API resources:

### Create Unmark As Non API

> "Create a unmark-as-non-api named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f unmark_as_non_api.yaml

# Get
f5xcctl get unmark_as_non_api {name} -n {namespace}

# List
f5xcctl get unmark_as_non_apis -n {namespace}

# Delete
f5xcctl delete unmark_as_non_api {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_unmark_as_non_api" "example" {
  name      = "example-unmark-as-non-api"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
