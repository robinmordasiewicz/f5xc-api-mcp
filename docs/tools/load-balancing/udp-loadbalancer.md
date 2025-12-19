---
page_title: f5xc_udp_loadbalancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create UDP Load Balancer
---

# UDP Loadbalancer

Shape of the UDP load balancer replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-udp-loadbalancer-create` | Create UDP Load Balancer |
| `f5xc-api-core-udp-loadbalancer-get` | Get UDP Load Balancer |
| `f5xc-api-core-udp-loadbalancer-list` | List Configure UDP Load Balancer |
| `f5xc-api-core-udp-loadbalancer-update` | Replace UDP Load Balancer |
| `f5xc-api-core-udp-loadbalancer-delete` | Delete Configure UDP Load Balancer |

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

Ask Claude to help you work with UDP Loadbalancer resources:

### Create UDP Loadbalancer

> "Create a udp-loadbalancer named 'example' in the 'production' namespace"

### List UDP Loadbalancers

> "List all udp-loadbalancers in the 'production' namespace"

### Get UDP Loadbalancer Details

> "Get details of the udp-loadbalancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create udp_loadbalancer -n <namespace> -i udp_loadbalancer.yaml

# Get
f5xcctl configuration get udp_loadbalancer -n <namespace> <name>

# List
f5xcctl configuration list udp_loadbalancer -n <namespace>

# Delete
f5xcctl configuration delete udp_loadbalancer -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_udp_loadbalancer" "example" {
  name      = "example-udp-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
