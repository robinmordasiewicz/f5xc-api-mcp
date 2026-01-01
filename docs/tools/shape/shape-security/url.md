---
page_title: f5xc_url - f5xc-api-mcp
subcategory: Shape
description: GET Bot Assessment by Top URLs.
---

# Url

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Bot Top URL Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-url-create` | GET Bot Assessment by Top URLs. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- url

## Example Usage

Ask Claude to help you work with Url resources:

### Create Url

> "Create a url named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create url -n <namespace> -i url.yaml

# Get
xcsh shape get url <name> -n <namespace>

# List
xcsh shape list url -n <namespace>

# Delete
xcsh shape delete url <name> -n <namespace>
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
