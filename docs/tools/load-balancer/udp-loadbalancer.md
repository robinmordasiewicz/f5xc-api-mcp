---
page_title: f5xc_udp_loadbalancer - f5xc-api-mcp
subcategory: Load Balancing
description: Create UDP Load Balancer.
---

# UDP Loadbalancer

Shape of the UDP load balancer replace specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-udp-loadbalancer-create` | Create UDP Load Balancer. |
| `f5xc-api-loadbalancer-udp-loadbalancer-get` | GET UDP Load Balancer. |
| `f5xc-api-loadbalancer-udp-loadbalancer-list` | List Configure UDP Load Balancer. |
| `f5xc-api-loadbalancer-udp-loadbalancer-update` | Replace UDP Load Balancer. |
| `f5xc-api-loadbalancer-udp-loadbalancer-delete` | DELETE Configure UDP Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
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
f5xcctl load_balancer create udp_loadbalancer -n <namespace> -i udp_loadbalancer.yaml

# Get
f5xcctl load_balancer get udp_loadbalancer <name> -n <namespace>

# List
f5xcctl load_balancer list udp_loadbalancer -n <namespace>

# Delete
f5xcctl load_balancer delete udp_loadbalancer <name> -n <namespace>
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
