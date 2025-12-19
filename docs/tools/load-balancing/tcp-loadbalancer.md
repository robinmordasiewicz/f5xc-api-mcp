---
page_title: f5xc_tcp_loadbalancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create TCP Load Balancer
---

# TCP Loadbalancer

Shape of the TCP load balancer replace specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-tcp-loadbalancer-create` | Create TCP Load Balancer |
| `f5xc-api-core-tcp-loadbalancer-get` | Get TCP Load Balancer |
| `f5xc-api-core-tcp-loadbalancer-list` | List Configure TCP Load Balancer |
| `f5xc-api-core-tcp-loadbalancer-update` | Replace TCP Load Balancer |
| `f5xc-api-core-tcp-loadbalancer-delete` | Delete Configure TCP Load Balancer |

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

Ask Claude to help you work with TCP Loadbalancer resources:

### Create TCP Loadbalancer

> "Create a tcp-loadbalancer named 'example' in the 'production' namespace"

### List TCP Loadbalancers

> "List all tcp-loadbalancers in the 'production' namespace"

### Get TCP Loadbalancer Details

> "Get details of the tcp-loadbalancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create tcp_loadbalancer -n <namespace> -i tcp_loadbalancer.yaml

# Get
f5xcctl configuration get tcp_loadbalancer -n <namespace> <name>

# List
f5xcctl configuration list tcp_loadbalancer -n <namespace>

# Delete
f5xcctl configuration delete tcp_loadbalancer -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_tcp_loadbalancer" "example" {
  name      = "example-tcp-loadbalancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
