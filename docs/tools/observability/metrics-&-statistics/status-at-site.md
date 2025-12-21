---
page_title: f5xc_status_at_site - f5xc-api-mcp
subcategory: Observability
description: GET Status.
---

# Status At Site

GET status of an object in a given site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-status-at-site-get` | GET Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `kind` | Kind |
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site name |
| `site_type` | Site type indicates whether the site is CE or RE |

## Example Usage

Ask Claude to help you work with Status At Site resources:

### Get Status At Site Details

> "Get details of the status-at-site named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create status_at_site -n <namespace> -i status_at_site.yaml

# Get
f5xcctl observability get status_at_site <name> -n <namespace>

# List
f5xcctl observability list status_at_site -n <namespace>

# Delete
f5xcctl observability delete status_at_site <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_status_at_site" "example" {
  name      = "example-status-at-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
