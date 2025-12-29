---
page_title: f5xc_inactive - f5xc-api-mcp
subcategory: Tenant And Identity
description: ListInactiveUsers.
---

# Inactive

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns list of users for which no login events was found for last 90 days of time.
It consider all
users within current tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-inactive-list` | ListInactiveUsers. |

## Example Usage

Ask Claude to help you work with Inactive resources:

### List Inactives

> "List all inactives in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web inactive list --namespace {namespace}
```

List all inactives

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create inactive -n <namespace> -i inactive.yaml

# Get
f5xcctl tenant_and_identity get inactive <name> -n <namespace>

# List
f5xcctl tenant_and_identity list inactive -n <namespace>

# Delete
f5xcctl tenant_and_identity delete inactive <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_inactive" "example" {
  name      = "example-inactive"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
