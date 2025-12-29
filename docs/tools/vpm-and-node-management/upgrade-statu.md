---
page_title: f5xc_upgrade_statu - f5xc-api-mcp
subcategory: Vpm And Node Management
description: Upgrade Status.
---

# Upgrade Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

Request to GET the upgrade status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-vpmandnodemanagement-upgrade-statu-list` | Upgrade Status. |

## Example Usage

Ask Claude to help you work with Upgrade Statu resources:

### List Upgrade Status

> "List all upgrade-status in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data upgrade-statu list --namespace {namespace}
```

List all upgrade-status

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl vpm_and_node_management create upgrade_statu -n <namespace> -i upgrade_statu.yaml

# Get
f5xcctl vpm_and_node_management get upgrade_statu <name> -n <namespace>

# List
f5xcctl vpm_and_node_management list upgrade_statu -n <namespace>

# Delete
f5xcctl vpm_and_node_management delete upgrade_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_upgrade_statu" "example" {
  name      = "example-upgrade-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
