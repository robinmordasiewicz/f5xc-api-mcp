---
page_title: f5xc_dns_lb_pool - f5xc-api-mcp
subcategory: DNS
description: Create DNS Load Balancer Pool
---

# DNS Lb Pool

Create DNS Load Balancer Pool in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-lb-pool-create` | Create DNS Load Balancer Pool |
| `f5xc-api-dns-dns-lb-pool-get` | Get DNS Load Balancer Pool |
| `f5xc-api-dns-dns-lb-pool-list` | List DNS Load Balancer Pool |
| `f5xc-api-dns-dns-lb-pool-update` | Replace DNS Load Balancer Pool |
| `f5xc-api-dns-dns-lb-pool-delete` | Delete DNS Load Balancer Pool |

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
f5xcctl apply -f dns_lb_pool.yaml

# Get
f5xcctl get dns_lb_pool {name} -n {namespace}

# List
f5xcctl get dns_lb_pools -n {namespace}

# Delete
f5xcctl delete dns_lb_pool {name} -n {namespace}
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
