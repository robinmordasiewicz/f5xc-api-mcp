---
page_title: f5xc_resync_crl - f5xc-api-mcp
subcategory: Support
description: Resync CRL.
---

# Resync Crl

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Resync CRL by downloading from the server again.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-resync-crl-create` | Resync CRL. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- resync-crl

## Example Usage

Ask Claude to help you work with Resync Crl resources:

### Create Resync Crl

> "Create a resync-crl named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create resync_crl -n <namespace> -i resync_crl.yaml

# Get
xcsh support get resync_crl <name> -n <namespace>

# List
xcsh support list resync_crl -n <namespace>

# Delete
xcsh support delete resync_crl <name> -n <namespace>
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
