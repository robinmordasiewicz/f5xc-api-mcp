---
page_title: f5xc_dns_domain - f5xc-api-mcp
subcategory: DNS
description: Create DNS Domain.
---

# DNS Domain

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create DNS Domain in a given namespace. If one already exist it will give a error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-dns-domain-create` | Create DNS Domain. |
| `f5xc-api-dns-dns-domain-get` | GET DNS Domain. |
| `f5xc-api-dns-dns-domain-list` | List DNS Domain. |
| `f5xc-api-dns-dns-domain-update` | Replace DNS Domain. |
| `f5xc-api-dns-dns-domain-delete` | DELETE DNS Domain. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- dns-domain

**Modifies:**

- dns-domain

**Deletes:**

- dns-domain
- contained_resources

## Example Usage

Ask Claude to help you work with DNS Domain resources:

### Create DNS Domain

> "Create a dns-domain named 'example' in the 'production' namespace"

### List DNS Domains

> "List all dns-domains in the 'production' namespace"

### Get DNS Domain Details

> "Get details of the dns-domain named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh dns create dns_domain -n <namespace> -i dns_domain.yaml

# Get
xcsh dns get dns_domain <name> -n <namespace>

# List
xcsh dns list dns_domain -n <namespace>

# Delete
xcsh dns delete dns_domain <name> -n <namespace>
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
