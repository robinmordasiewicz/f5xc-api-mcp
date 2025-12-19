---
page_title: f5xc_v1_dns_monitor - f5xc-api-mcp
subcategory: Organization
description: Create DNS Monitor
---

# V1 DNS Monitor

List the set of v1_dns_monitor in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-v1-dns-monitor-create` | Create DNS Monitor |
| `f5xc-api-core-v1-dns-monitor-get` | Get DNS Monitor |
| `f5xc-api-core-v1-dns-monitor-list` | List DNS Monitor |
| `f5xc-api-core-v1-dns-monitor-update` | Replace DNS Monitor |
| `f5xc-api-core-v1-dns-monitor-delete` | Delete DNS Monitor |

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

Ask Claude to help you work with V1 DNS Monitor resources:

### Create V1 DNS Monitor

> "Create a v1-dns-monitor named 'example' in the 'production' namespace"

### List V1 DNS Monitors

> "List all v1-dns-monitors in the 'production' namespace"

### Get V1 DNS Monitor Details

> "Get details of the v1-dns-monitor named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create v1_dns_monitor -n <namespace> -i v1_dns_monitor.yaml

# Get
f5xcctl configuration get v1_dns_monitor -n <namespace> <name>

# List
f5xcctl configuration list v1_dns_monitor -n <namespace>

# Delete
f5xcctl configuration delete v1_dns_monitor -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_v1_dns_monitor" "example" {
  name      = "example-v1-dns-monitor"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
