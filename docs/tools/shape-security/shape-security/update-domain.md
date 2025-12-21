---
page_title: f5xc_update_domain - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: Update Domains.
---

# Update Domain

Update domain from mitigated domains to allowed domains and vice versa.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-update-domain-create` | Update Domains. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Update Domain resources:

### Create Update Domain

> "Create a update-domain named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create update_domain -n <namespace> -i update_domain.yaml

# Get
f5xcctl configuration get update_domain -n <namespace> <name>

# List
f5xcctl configuration list update_domain -n <namespace>

# Delete
f5xcctl configuration delete update_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_update_domain" "example" {
  name      = "example-update-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
