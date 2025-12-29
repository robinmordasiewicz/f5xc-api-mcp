---
page_title: f5xc_state - f5xc-api-mcp
subcategory: Tenant And Identity
description: List states.
---

# State

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns a list of known states of a country. List will be empty if country has no states.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-state-list` | List states. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `country_code` | Country code | `US` |
| `prefix` | Prefix | `AL for Alabama.` |

## Example Usage

Ask Claude to help you work with State resources:

### List States

> "List all states in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web state list --namespace {namespace}
```

List all states

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create state -n <namespace> -i state.yaml

# Get
f5xcctl tenant_and_identity get state <name> -n <namespace>

# List
f5xcctl tenant_and_identity list state -n <namespace>

# Delete
f5xcctl tenant_and_identity delete state <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_state" "example" {
  name      = "example-state"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
