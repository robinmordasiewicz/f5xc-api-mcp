---
page_title: f5xc_status_at_site - f5xc-api-mcp
subcategory: Telemetry And Insights
description: GET Status.
---

# Status At Site

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET status of an object in a given site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-status-at-site-get` | GET Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `kind` | Kind | `Virtual_host.` |
| `name` | Name | `Productpage.` |
| `namespace` | Namespace | `Bookinfo` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site name | `Ce01` |
| `site_type` | Site type indicates whether the site is CE or RE | `-` |

## Example Usage

Ask Claude to help you work with Status At Site resources:

### Get Status At Site Details

> "Get details of the status-at-site named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create status_at_site -n <namespace> -i status_at_site.yaml

# Get
xcsh telemetry_and_insights get status_at_site <name> -n <namespace>

# List
xcsh telemetry_and_insights list status_at_site -n <namespace>

# Delete
xcsh telemetry_and_insights delete status_at_site <name> -n <namespace>
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
