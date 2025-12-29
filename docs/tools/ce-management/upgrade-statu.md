---
page_title: f5xc_upgrade_statu - f5xc-api-mcp
subcategory: Ce Management
description: GET Upgrade Status.
---

# Upgrade Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET upgrade status of a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-upgrade-statu-get` | GET Upgrade Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |

## Example Usage

Ask Claude to help you work with Upgrade Statu resources:

### Get Upgrade Statu Details

> "Get details of the upgrade-statu named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl maurice upgrade-statu get {name} --namespace {namespace}
```

Get specific upgrade-statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create upgrade_statu -n <namespace> -i upgrade_statu.yaml

# Get
f5xcctl ce_management get upgrade_statu <name> -n <namespace>

# List
f5xcctl ce_management list upgrade_statu -n <namespace>

# Delete
f5xcctl ce_management delete upgrade_statu <name> -n <namespace>
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
