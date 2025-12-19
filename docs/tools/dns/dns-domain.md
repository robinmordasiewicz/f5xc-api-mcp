---
page_title: f5xc_dns_domain - f5xc-api-mcp
subcategory: DNS
description: Create DNS Domain
---

# DNS Domain

Create DNS Domain in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dns-domain-create` | Create DNS Domain |
| `f5xc-api-core-dns-domain-get` | Get DNS Domain |
| `f5xc-api-core-dns-domain-list` | List DNS Domain |
| `f5xc-api-core-dns-domain-update` | Replace DNS Domain |
| `f5xc-api-core-dns-domain-delete` | Delete DNS Domain |

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

Ask Claude to help you work with DNS Domain resources:

### Create DNS Domain

> "Create a dns-domain named 'example' in the 'production' namespace"

### List DNS Domains

> "List all dns-domains in the 'production' namespace"

### Get DNS Domain Details

> "Get details of the dns-domain named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create dns_domain -n <namespace> -i dns_domain.yaml

# Get
f5xcctl configuration get dns_domain -n <namespace> <name>

# List
f5xcctl configuration list dns_domain -n <namespace>

# Delete
f5xcctl configuration delete dns_domain -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_dns_domain" "example" {
  name      = "example-dns-domain"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
