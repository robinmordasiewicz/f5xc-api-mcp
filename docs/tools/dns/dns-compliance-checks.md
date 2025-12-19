---
page_title: f5xc_dns_compliance_checks - f5xc-api-mcp
subcategory: DNS
description: Create DNS Compliance Checks
---

# DNS Compliance Checks

Create DNS Compliance Checks Specification in a given namespace. If one already exists it will give
an error.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-dns-compliance-checks-create` | Create DNS Compliance Checks |
| `f5xc-api-core-dns-compliance-checks-get` | Get DNS Compliance Checks  |
| `f5xc-api-core-dns-compliance-checks-list` | List Configure DNS Compliance Checks |
| `f5xc-api-core-dns-compliance-checks-update` | Replace DNS Compliance Checks  |
| `f5xc-api-core-dns-compliance-checks-delete` | Delete Configure DNS Compliance Checks |

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

Ask Claude to help you work with DNS Compliance Checks resources:

### Create DNS Compliance Checks

> "Create a dns-compliance-checks named 'example' in the 'production' namespace"

### List DNS Compliance Checkss

> "List all dns-compliance-checkss in the 'production' namespace"

### Get DNS Compliance Checks Details

> "Get details of the dns-compliance-checks named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create dns_compliance_checks -n <namespace> -i dns_compliance_checks.yaml

# Get
f5xcctl configuration get dns_compliance_checks -n <namespace> <name>

# List
f5xcctl configuration list dns_compliance_checks -n <namespace>

# Delete
f5xcctl configuration delete dns_compliance_checks -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_dns_compliance_checks" "example" {
  name      = "example-dns-compliance-checks"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
