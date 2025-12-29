---
page_title: f5xc_setting - f5xc-api-mcp
subcategory: Ce Management
description: Module Management Settings.
---

# Setting

!!! info "Low Risk"
    Operations on this resource are generally safe.

Receive the module settings.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-setting-list` | Module Management Settings. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Setting resources:

### List Settings

> "List all settings in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config setting list --namespace {namespace}
```

List all settings

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create setting -n <namespace> -i setting.yaml

# Get
f5xcctl ce_management get setting <name> -n <namespace>

# List
f5xcctl ce_management list setting -n <namespace>

# Delete
f5xcctl ce_management delete setting <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_setting" "example" {
  name      = "example-setting"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
