---
page_title: f5xc_get_dns_info - f5xc-api-mcp
subcategory: Load Balancing
description: GET DNS Info.
---

# Get DNS Info

GetDnsInfo is an API to GET DNS information for a given HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-loadbalancer-get-dns-info-get` | GET DNS Info. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Get DNS Info resources:

### Get Get DNS Info Details

> "Get details of the get-dns-info named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl load_balancer create get_dns_info -n <namespace> -i get_dns_info.yaml

# Get
f5xcctl load_balancer get get_dns_info <name> -n <namespace>

# List
f5xcctl load_balancer list get_dns_info -n <namespace>

# Delete
f5xcctl load_balancer delete get_dns_info <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_dns_info" "example" {
  name      = "example-get-dns-info"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
