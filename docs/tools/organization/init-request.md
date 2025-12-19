---
page_title: f5xc_init_request - f5xc-api-mcp
subcategory: Organization
description: Enable Data Intelligence
---

# Init Request

Request to enable Data Intelligence for the tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-init-request-create` | Enable Data Intelligence |

## Example Usage

Ask Claude to help you work with Init Request resources:

### Create Init Request

> "Create a init-request named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create init_request -n <namespace> -i init_request.yaml

# Get
f5xcctl configuration get init_request -n <namespace> <name>

# List
f5xcctl configuration list init_request -n <namespace>

# Delete
f5xcctl configuration delete init_request -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_init_request" "example" {
  name      = "example-init-request"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
