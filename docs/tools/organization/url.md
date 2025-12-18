---
page_title: f5xc_url - f5xc-api-mcp
subcategory: Organization
description: Get Bot Assessment by Top Urls
---

# Url

Get Bot Top URL Information

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-url-create` | Get Bot Assessment by Top Urls |

## Example Usage

Ask Claude to help you work with Url resources:

### Create Url

> "Create a url named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f url.yaml

# Get
f5xcctl get url {name} -n {namespace}

# List
f5xcctl get urls -n {namespace}

# Delete
f5xcctl delete url {name} -n {namespace}
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
