---
page_title: f5xc_countrie - f5xc-api-mcp
subcategory: Tenant And Identity
description: List countries.
---

# Countrie

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns a list of supported countries along with with additional information such as address
validation rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-countrie-list` | List countries. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `prefix` | Prefix | `US for USA.` |

## Example Usage

Ask Claude to help you work with Countrie resources:

### List Countries

> "List all countries in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web countrie list --namespace {namespace}
```

List all countries

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create countrie -n <namespace> -i countrie.yaml

# Get
f5xcctl tenant_and_identity get countrie <name> -n <namespace>

# List
f5xcctl tenant_and_identity list countrie -n <namespace>

# Delete
f5xcctl tenant_and_identity delete countrie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_countrie" "example" {
  name      = "example-countrie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
