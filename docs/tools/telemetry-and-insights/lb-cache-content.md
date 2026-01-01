---
page_title: f5xc_lb_cache_content - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Cacheability query Query.
---

# Lb Cache Content

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series cacheable data for HTTP-LBs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-lb-cache-content-create` | Cacheability query Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- lb-cache-content

## Example Usage

Ask Claude to help you work with Lb Cache Content resources:

### Create Lb Cache Content

> "Create a lb-cache-content named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create lb_cache_content -n <namespace> -i lb_cache_content.yaml

# Get
xcsh telemetry_and_insights get lb_cache_content <name> -n <namespace>

# List
xcsh telemetry_and_insights list lb_cache_content -n <namespace>

# Delete
xcsh telemetry_and_insights delete lb_cache_content <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_lb_cache_content" "example" {
  name      = "example-lb-cache-content"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
