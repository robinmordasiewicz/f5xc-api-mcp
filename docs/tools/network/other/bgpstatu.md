---
page_title: f5xc_bgpstatu - f5xc-api-mcp
subcategory: Network
description: GET BGP Status for view.
---

# Bgpstatu

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returned from list of BGP status objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-bgpstatu-list` | GET BGP Status for view. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `view_name` | Name of view | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `view_kind` | Kind of view of which BGP status objects are requested e.g. Aws_tgw_site. | `Value` |

## Example Usage

Ask Claude to help you work with Bgpstatu resources:

### List Bgpstatus

> "List all bgpstatus in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config bgpstatu list --namespace {namespace}
```

List all bgpstatus

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create bgpstatu -n <namespace> -i bgpstatu.yaml

# Get
f5xcctl network get bgpstatu <name> -n <namespace>

# List
f5xcctl network list bgpstatu -n <namespace>

# Delete
f5xcctl network delete bgpstatu <name> -n <namespace>
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
