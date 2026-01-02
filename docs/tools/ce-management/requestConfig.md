---
page_title: f5xc_requestConfig - f5xc-api-mcp
subcategory: Ce Management
description: Registration Config.
---

# RequestConfig

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

API endpoint for returning configuration for admitted registrations.
It will fail with known error
for non-ADMITTED registration.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-requestconfig-create` | Registration Config. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- requestConfig

## Example Usage

Ask Claude to help you work with RequestConfig resources:

### Create RequestConfig

> "Create a requestConfig named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh ce_management create requestConfig -n <namespace> -i requestConfig.yaml

# Get
xcsh ce_management get requestConfig <name> -n <namespace>

# List
xcsh ce_management list requestConfig -n <namespace>

# Delete
xcsh ce_management delete requestConfig <name> -n <namespace>
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
