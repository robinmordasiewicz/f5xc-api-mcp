---
page_title: f5xc_dns_domain - f5xc-api-mcp
subcategory: Networking
description: Create DNS Domain.
---

# DNS Domain

Create DNS Domain in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-dns-domain-create` | Create DNS Domain. |
| `f5xc-api-networking-dns-domain-get` | GET DNS Domain. |
| `f5xc-api-networking-dns-domain-list` | List DNS Domain. |
| `f5xc-api-networking-dns-domain-update` | Replace DNS Domain. |
| `f5xc-api-networking-dns-domain-delete` | DELETE DNS Domain. |

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
f5xcctl networking create dns_domain -n <namespace> -i dns_domain.yaml

# Get
f5xcctl networking get dns_domain <name> -n <namespace>

# List
f5xcctl networking list dns_domain -n <namespace>

# Delete
f5xcctl networking delete dns_domain <name> -n <namespace>
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
