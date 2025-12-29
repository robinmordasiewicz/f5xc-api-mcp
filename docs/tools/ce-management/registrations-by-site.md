---
page_title: f5xc_registrations_by_site - f5xc-api-mcp
subcategory: Ce Management
description: List registrations by site.
---

# Registrations By Site

!!! info "Low Risk"
    Operations on this resource are generally safe.

List all registration in site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cemanagement-registrations-by-site-list` | List registrations by site. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site_name` | SiteName | `Ce02` |

## Example Usage

Ask Claude to help you work with Registrations By Site resources:

### List Registrations By Sites

> "List all registrations-by-sites in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl register registrations-by-site list --namespace {namespace}
```

List all registrations-by-sites

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ce_management create registrations_by_site -n <namespace> -i registrations_by_site.yaml

# Get
f5xcctl ce_management get registrations_by_site <name> -n <namespace>

# List
f5xcctl ce_management list registrations_by_site -n <namespace>

# Delete
f5xcctl ce_management delete registrations_by_site <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_registrations_by_site" "example" {
  name      = "example-registrations-by-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
