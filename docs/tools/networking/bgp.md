---
page_title: f5xc_bgp - f5xc-api-mcp
subcategory: Networking
description: Create BGP
---

# Bgp

BGP object is the configuration for peering with external BGP servers.
Replace bgp will replace the
contents of given BGP object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bgp-create` | Create BGP |
| `f5xc-api-core-bgp-get` | Get BGP |
| `f5xc-api-core-bgp-list` | List BGP |
| `f5xc-api-core-bgp-update` | Replace BGP |
| `f5xc-api-core-bgp-delete` | Delete BGP |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Bgp resources:

### Create Bgp

> "Create a bgp named 'example' in the 'production' namespace"

### List Bgps

> "List all bgps in the 'production' namespace"

### Get Bgp Details

> "Get details of the bgp named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bgp.yaml

# Get
f5xcctl get bgp {name} -n {namespace}

# List
f5xcctl get bgps -n {namespace}

# Delete
f5xcctl delete bgp {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bgp" "example" {
  name      = "example-bgp"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
