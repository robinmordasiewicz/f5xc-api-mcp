---
page_title: f5xc_dns_zone - f5xc-api-mcp
subcategory: DNS
description: Create DNS Zone
---

# DNS Zone

Create DNS Zone in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-zone-create` | Create DNS Zone |
| `f5xc-api-dns-dns-zone-get` | Get DNS Zone |
| `f5xc-api-dns-dns-zone-list` | List DNS Zone |
| `f5xc-api-dns-dns-zone-update` | Replace DNS Zone |
| `f5xc-api-dns-dns-zone-delete` | Delete DNS Zone |

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

Ask Claude to help you work with DNS Zone resources:

### Create DNS Zone

> "Create a dns-zone named 'example' in the 'production' namespace"

### List DNS Zones

> "List all dns-zones in the 'production' namespace"

### Get DNS Zone Details

> "Get details of the dns-zone named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f dns_zone.yaml

# Get
f5xcctl get dns_zone {name} -n {namespace}

# List
f5xcctl get dns_zones -n {namespace}

# Delete
f5xcctl delete dns_zone {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_dns_zone" "example" {
  name      = "example-dns-zone"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
