---
page_title: f5xc_requestConfig - f5xc-api-mcp
subcategory: Infrastructure
description: Registration Config.
---

# RequestConfig

API endpoint for returning configuration for admitted registrations.
It will fail with known error
for non-ADMITTED registration.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-requestconfig-create` | Registration Config. |

## Example Usage

Ask Claude to help you work with RequestConfig resources:

### Create RequestConfig

> "Create a requestConfig named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create requestConfig -n <namespace> -i requestConfig.yaml

# Get
f5xcctl configuration get requestConfig -n <namespace> <name>

# List
f5xcctl configuration list requestConfig -n <namespace>

# Delete
f5xcctl configuration delete requestConfig -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_requestConfig" "example" {
  name      = "example-requestConfig"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
