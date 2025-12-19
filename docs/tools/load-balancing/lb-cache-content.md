---
page_title: f5xc_lb_cache_content - f5xc-api-mcp
subcategory: Load Balancing
description: Cacheability query Query
---

# Lb Cache Content

Request to get time-series cacheable data for HTTP-LBs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-lb-cache-content-create` | Cacheability query Query |

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
f5xcctl apply -f lb_cache_content.yaml

# Get
f5xcctl get lb_cache_content {name} -n {namespace}

# List
f5xcctl get lb_cache_contents -n {namespace}

# Delete
f5xcctl delete lb_cache_content {name} -n {namespace}
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
