---
page_title: f5xc_secret - f5xc-api-mcp
subcategory: Infrastructure
description: Secret List.
---

# Secret

API to GET list of secrets for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-secret-list` | Secret List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Secret resources:

### List Secrets

> "List all secrets in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create secret -n <namespace> -i secret.yaml

# Get
f5xcctl infrastructure get secret <name> -n <namespace>

# List
f5xcctl infrastructure list secret -n <namespace>

# Delete
f5xcctl infrastructure delete secret <name> -n <namespace>
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
