---
page_title: f5xc_secret - f5xc-api-mcp
subcategory: Certificates
description: Secret List
---

# Secret

API to get list of secrets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-secret-list` | Secret List |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `site` | site |

## Example Usage

Ask Claude to help you work with Secret resources:

### List Secrets

> "List all secrets in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create secret -n <namespace> -i secret.yaml

# Get
f5xcctl configuration get secret -n <namespace> <name>

# List
f5xcctl configuration list secret -n <namespace>

# Delete
f5xcctl configuration delete secret -n <namespace> <name>
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
