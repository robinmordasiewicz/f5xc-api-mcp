---
page_title: f5xc_site - f5xc-api-mcp
subcategory: Observability
description: Site Topology.
---

# Site

GET topology of a site and the resources associated/connected to the site such as other Customer
sites,
Regional Sites, VPCs (Virtual Private Cloud) networks, etc., and the associated metrics.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-site-create` | Site Topology. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

## Example Usage

Ask Claude to help you work with Site resources:

### Create Site

> "Create a site named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create site -n <namespace> -i site.yaml

# Get
f5xcctl configuration get site -n <namespace> <name>

# List
f5xcctl configuration list site -n <namespace>

# Delete
f5xcctl configuration delete site -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_site" "example" {
  name      = "example-site"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
