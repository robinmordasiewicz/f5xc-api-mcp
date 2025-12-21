---
page_title: f5xc_policie - f5xc-api-mcp
subcategory: Security
description: Deploy Policies to Bot Infra.
---

# Policie

Deploy Policies to Bot Infrastructure.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-policie-create` | Deploy Policies to Bot Infra. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Bot Infra Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Policie resources:

### Create Policie

> "Create a policie named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create policie -n <namespace> -i policie.yaml

# Get
f5xcctl security get policie <name> -n <namespace>

# List
f5xcctl security list policie -n <namespace>

# Delete
f5xcctl security delete policie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_policie" "example" {
  name      = "example-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
