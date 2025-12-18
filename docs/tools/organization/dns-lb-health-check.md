---
page_title: f5xc_dns_lb_health_check - f5xc-api-mcp
subcategory: Organization
description: Create DNS Load Balancer Health Check
---

# DNS Lb Health Check

Create DNS Load Balancer Health Check in a given namespace. If one already exist it will give a
error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dns-lb-health-check-create` | Create DNS Load Balancer Health Check |
| `f5xc-api-core-dns-lb-health-check-get` | Get DNS Load Balancer Health Check |
| `f5xc-api-core-dns-lb-health-check-list` | List DNS Load Balancer Health Check |
| `f5xc-api-core-dns-lb-health-check-update` | Replace DNS Load Balancer Health Check |
| `f5xc-api-core-dns-lb-health-check-delete` | Delete DNS Load Balancer Health Check |

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

Ask Claude to help you work with DNS Lb Health Check resources:

### Create DNS Lb Health Check

> "Create a dns-lb-health-check named 'example' in the 'production' namespace"

### List DNS Lb Health Checks

> "List all dns-lb-health-checks in the 'production' namespace"

### Get DNS Lb Health Check Details

> "Get details of the dns-lb-health-check named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f dns_lb_health_check.yaml

# Get
f5xcctl get dns_lb_health_check {name} -n {namespace}

# List
f5xcctl get dns_lb_health_checks -n {namespace}

# Delete
f5xcctl delete dns_lb_health_check {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_dns_lb_health_check" "example" {
  name      = "example-dns-lb-health-check"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
