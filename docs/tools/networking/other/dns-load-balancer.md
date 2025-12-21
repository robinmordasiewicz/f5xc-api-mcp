---
page_title: f5xc_dns_load_balancer - f5xc-api-mcp
subcategory: Networking
description: Create DNS Load Balancer.
---

# DNS Load Balancer

Create DNS Load Balancer in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-dns-load-balancer-create` | Create DNS Load Balancer. |
| `f5xc-api-networking-dns-load-balancer-get` | GET DNS Load Balancer. |
| `f5xc-api-networking-dns-load-balancer-list` | List DNS Load Balancer. |
| `f5xc-api-networking-dns-load-balancer-update` | Replace DNS Load Balancer. |
| `f5xc-api-networking-dns-load-balancer-delete` | DELETE DNS Load Balancer. |

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

Ask Claude to help you work with DNS Load Balancer resources:

### Create DNS Load Balancer

> "Create a dns-load-balancer named 'example' in the 'production' namespace"

### List DNS Load Balancers

> "List all dns-load-balancers in the 'production' namespace"

### Get DNS Load Balancer Details

> "Get details of the dns-load-balancer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create dns_load_balancer -n <namespace> -i dns_load_balancer.yaml

# Get
f5xcctl networking get dns_load_balancer <name> -n <namespace>

# List
f5xcctl networking list dns_load_balancer -n <namespace>

# Delete
f5xcctl networking delete dns_load_balancer <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dns_load_balancer" "example" {
  name      = "example-dns-load-balancer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
