---
page_title: f5xc_registrations_by_site - f5xc-api-mcp
subcategory: Sites
description: List registrations by site
---

# Registrations By Site

List all registration in site

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-registrations-by-site-list` | List registrations by site |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site_name` | SiteName |

## Example Usage

Ask Claude to help you work with Registrations By Site resources:

### List Registrations By Sites

> "List all registrations-by-sites in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f registrations_by_site.yaml

# Get
f5xcctl get registrations_by_site {name} -n {namespace}

# List
f5xcctl get registrations_by_sites -n {namespace}

# Delete
f5xcctl delete registrations_by_site {name} -n {namespace}
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
