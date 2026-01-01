---
page_title: f5xc_secret - f5xc-api-mcp
subcategory: Sites
description: Secret List.
---

# Secret

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of secrets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-secret-list` | Secret List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |
| `site` | Site | `Site-1` |

## Example Usage

Ask Claude to help you work with Secret resources:

### List Secrets

> "List all secrets in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create secret -n <namespace> -i secret.yaml

# Get
xcsh sites get secret <name> -n <namespace>

# List
xcsh sites list secret -n <namespace>

# Delete
xcsh sites delete secret <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_secret" "example" {
  name      = "example-secret"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
