---
page_title: f5xc_lb_cache_content - f5xc-api-mcp
subcategory: Observability
description: Cacheability query Query.
---

# Lb Cache Content

Request to GET time-series cacheable data for HTTP-LBs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-lb-cache-content-create` | Cacheability query Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Lb Cache Content resources:

### Create Lb Cache Content

> "Create a lb-cache-content named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create lb_cache_content -n <namespace> -i lb_cache_content.yaml

# Get
f5xcctl configuration get lb_cache_content -n <namespace> <name>

# List
f5xcctl configuration list lb_cache_content -n <namespace>

# Delete
f5xcctl configuration delete lb_cache_content -n <namespace> <name>
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
