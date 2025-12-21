---
page_title: f5xc_dns_lb_pool - f5xc-api-mcp
subcategory: Networking
description: Create DNS Load Balancer Pool.
---

# DNS Lb Pool

Create DNS Load Balancer Pool in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-dns-lb-pool-create` | Create DNS Load Balancer Pool. |
| `f5xc-api-networking-dns-lb-pool-get` | GET DNS Load Balancer Pool. |
| `f5xc-api-networking-dns-lb-pool-list` | List DNS Load Balancer Pool. |
| `f5xc-api-networking-dns-lb-pool-update` | Replace DNS Load Balancer Pool. |
| `f5xc-api-networking-dns-lb-pool-delete` | DELETE DNS Load Balancer Pool. |

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

Ask Claude to help you work with DNS Lb Pool resources:

### Create DNS Lb Pool

> "Create a dns-lb-pool named 'example' in the 'production' namespace"

### List DNS Lb Pools

> "List all dns-lb-pools in the 'production' namespace"

### Get DNS Lb Pool Details

> "Get details of the dns-lb-pool named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create dns_lb_pool -n <namespace> -i dns_lb_pool.yaml

# Get
f5xcctl configuration get dns_lb_pool -n <namespace> <name>

# List
f5xcctl configuration list dns_lb_pool -n <namespace>

# Delete
f5xcctl configuration delete dns_lb_pool -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_dns_lb_pool" "example" {
  name      = "example-dns-lb-pool"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
