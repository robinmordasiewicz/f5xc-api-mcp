---
page_title: f5xc_resync_crl - f5xc-api-mcp
subcategory: Organization
description: Resync CRL
---

# Resync Crl

Resync CRL by downloading from the server again

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-resync-crl-create` | Resync CRL |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `site` | Site Name |

## Example Usage

Ask Claude to help you work with Resync Crl resources:

### Create Resync Crl

> "Create a resync-crl named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create resync_crl -n <namespace> -i resync_crl.yaml

# Get
f5xcctl configuration get resync_crl -n <namespace> <name>

# List
f5xcctl configuration list resync_crl -n <namespace>

# Delete
f5xcctl configuration delete resync_crl -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_resync_crl" "example" {
  name      = "example-resync-crl"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
