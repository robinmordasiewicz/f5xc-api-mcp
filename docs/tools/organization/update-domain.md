---
page_title: f5xc_update_domain - f5xc-api-mcp
subcategory: Organization
description: Update Domains
---

# Update Domain

Update domain from mitigated domains to allowed domains and vice versa

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-update-domain-create` | Update Domains |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Update Domain resources:

### Create Update Domain

> "Create a update-domain named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f update_domain.yaml

# Get
f5xcctl get update_domain {name} -n {namespace}

# List
f5xcctl get update_domains -n {namespace}

# Delete
f5xcctl delete update_domain {name} -n {namespace}
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
