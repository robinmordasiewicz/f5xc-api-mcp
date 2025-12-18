---
page_title: f5xc_requestConfig - f5xc-api-mcp
subcategory: Organization
description: Registration Config
---

# RequestConfig

API endpoint for returning configuration for admitted registrations.
It will fail with known error
for non-ADMITTED registration

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-requestconfig-create` | Registration Config |

## Example Usage

Ask Claude to help you work with RequestConfig resources:

### Create RequestConfig

> "Create a requestConfig named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f requestConfig.yaml

# Get
f5xcctl get requestConfig {name} -n {namespace}

# List
f5xcctl get requestConfigs -n {namespace}

# Delete
f5xcctl delete requestConfig {name} -n {namespace}
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
