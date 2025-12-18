---
page_title: f5xc_app_provision - f5xc-api-mcp
subcategory: Organization
description: Application Provision
---

# App Provision

Provision an application for a tenant

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-app-provision-create` | Application Provision |

## Example Usage

Ask Claude to help you work with App Provision resources:

### Create App Provision

> "Create a app-provision named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f app_provision.yaml

# Get
f5xcctl get app_provision {name} -n {namespace}

# List
f5xcctl get app_provisions -n {namespace}

# Delete
f5xcctl delete app_provision {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_app_provision" "example" {
  name      = "example-app-provision"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
