---
page_title: f5xc_url - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET Bot Assessment by Top URLs.
---

# Url

GET Bot Top URL Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-url-create` | GET Bot Assessment by Top URLs. |

## Example Usage

Ask Claude to help you work with Url resources:

### Create Url

> "Create a url named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create url -n <namespace> -i url.yaml

# Get
f5xcctl configuration get url -n <namespace> <name>

# List
f5xcctl configuration list url -n <namespace>

# Delete
f5xcctl configuration delete url -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_url" "example" {
  name      = "example-url"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
