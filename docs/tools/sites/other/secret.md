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

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data secret list --namespace {namespace}
```

List all secrets

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create secret -n <namespace> -i secret.yaml

# Get
f5xcctl sites get secret <name> -n <namespace>

# List
f5xcctl sites list secret -n <namespace>

# Delete
f5xcctl sites delete secret <name> -n <namespace>
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
