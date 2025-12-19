---
page_title: f5xc_cdn_loadbalancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create CDN Loadbalancer
---

# Cdn Loadbalancer

List the set of cdn_loadbalancer in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-cdn-loadbalancer-create` | Create CDN Loadbalancer |
| `f5xc-api-core-cdn-loadbalancer-get` | Get CDN Loadbalancer |
| `f5xc-api-core-cdn-loadbalancer-list` | List CDN Loadbalancer |
| `f5xc-api-core-cdn-loadbalancer-update` | Replace CDN Loadbalancer |
| `f5xc-api-core-cdn-loadbalancer-delete` | Delete CDN Loadbalancer |

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

Ask Claude to help you work with Cdn Loadbalancer resources:

### Create Cdn Loadbalancer

> "Create a cdn-loadbalancer named 'example' in the 'production' namespace"

### List Cdn Loadbalancers

> "List all cdn-loadbalancers in the 'production' namespace"

### Get Cdn Loadbalancer Details

> "Get details of the cdn-loadbalancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create cdn_loadbalancer -n <namespace> -i cdn_loadbalancer.yaml

# Get
f5xcctl configuration get cdn_loadbalancer -n <namespace> <name>

# List
f5xcctl configuration list cdn_loadbalancer -n <namespace>

# Delete
f5xcctl configuration delete cdn_loadbalancer -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_cdn_loadbalancer" "example" {
  name      = "example-cdn-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
