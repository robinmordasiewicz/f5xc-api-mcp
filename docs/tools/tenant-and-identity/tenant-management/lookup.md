---
page_title: f5xc_lookup - f5xc-api-mcp
subcategory: Tenant And Identity
description: Lookup cname.
---

# Lookup

!!! info "Low Risk"
    Operations on this resource are generally safe.

Checks if a cname is available.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-lookup-list` | Lookup cname. |

## Parameters

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `cname` | Cname to look-uo. | `Domain1` |
| `namespace` | Namespace to query. | `System` |

## Example Usage

Ask Claude to help you work with Lookup resources:

### List Lookups

> "List all lookups in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web lookup list --namespace {namespace}
```

List all lookups

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create lookup -n <namespace> -i lookup.yaml

# Get
f5xcctl tenant_and_identity get lookup <name> -n <namespace>

# List
f5xcctl tenant_and_identity list lookup -n <namespace>

# Delete
f5xcctl tenant_and_identity delete lookup <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_lookup" "example" {
  name      = "example-lookup"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
