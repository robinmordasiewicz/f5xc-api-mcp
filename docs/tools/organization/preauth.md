---
page_title: f5xc_preauth - f5xc-api-mcp
subcategory: Organization
description: Preauth
---

# Preauth

Pre-flight auth checks before calling the Provision API

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-preauth-create` | Preauth |

## Example Usage

Ask Claude to help you work with Preauth resources:

### Create Preauth

> "Create a preauth named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f preauth.yaml

# Get
f5xcctl get preauth {name} -n {namespace}

# List
f5xcctl get preauths -n {namespace}

# Delete
f5xcctl delete preauth {name} -n {namespace}
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
