---
page_title: f5xc_preauth - f5xc-api-mcp
subcategory: Integrations
description: Preauth
---

# Preauth

Pre-flight auth checks before calling the Provision API.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-integrations-preauth-create` | Preauth |

## Example Usage

Ask Claude to help you work with Preauth resources:

### Create Preauth

> "Create a preauth named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create preauth -n <namespace> -i preauth.yaml

# Get
f5xcctl configuration get preauth -n <namespace> <name>

# List
f5xcctl configuration list preauth -n <namespace>

# Delete
f5xcctl configuration delete preauth -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_preauth" "example" {
  name      = "example-preauth"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
