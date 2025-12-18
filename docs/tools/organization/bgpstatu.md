---
page_title: f5xc_bgpstatu - f5xc-api-mcp
subcategory: Organization
description: Get BGP Status for view
---

# Bgpstatu

returned from list of bgp status objects for a given view.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bgpstatu-list` | Get BGP Status for view |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `view_name` | Name of view |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `view_kind` | The view_kind parameter |

## Example Usage

Ask Claude to help you work with Bgpstatu resources:

### List Bgpstatus

> "List all bgpstatus in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bgpstatu.yaml

# Get
f5xcctl get bgpstatu {name} -n {namespace}

# List
f5xcctl get bgpstatus -n {namespace}

# Delete
f5xcctl delete bgpstatu {name} -n {namespace}
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
