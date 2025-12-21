---
page_title: f5xc_bgpstatu - f5xc-api-mcp
subcategory: Networking
description: GET BGP Status for view.
---

# Bgpstatu

Returned from list of BGP status objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-bgpstatu-list` | GET BGP Status for view. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `view_name` | Name of view |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `view_kind` | Kind of view of which BGP status objects are requested e.g. Aws_tgw_site. |

## Example Usage

Ask Claude to help you work with Bgpstatu resources:

### List Bgpstatus

> "List all bgpstatus in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create bgpstatu -n <namespace> -i bgpstatu.yaml

# Get
f5xcctl configuration get bgpstatu -n <namespace> <name>

# List
f5xcctl configuration list bgpstatu -n <namespace>

# Delete
f5xcctl configuration delete bgpstatu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_bgpstatu" "example" {
  name      = "example-bgpstatu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
