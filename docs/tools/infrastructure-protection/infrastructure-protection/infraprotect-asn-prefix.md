---
page_title: f5xc_infraprotect_asn_prefix - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Create DDoS transit Prefix.
---

# Infraprotect Asn Prefix

List the set of infraprotect_asn_prefix in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-infraprotect-asn-prefix-create` | Create DDoS transit Prefix. |
| `f5xc-api-infrastructureprotection-infraprotect-asn-prefix-get` | GET Infraprotect ASN Prefix. |
| `f5xc-api-infrastructureprotection-infraprotect-asn-prefix-list` | List Infraprotect ASN Prefix. |
| `f5xc-api-infrastructureprotection-infraprotect-asn-prefix-update` | Replace DDoS transit Prefix. |
| `f5xc-api-infrastructureprotection-infraprotect-asn-prefix-delete` | DELETE Infraprotect ASN Prefix. |

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

Ask Claude to help you work with Infraprotect Asn Prefix resources:

### Create Infraprotect Asn Prefix

> "Create a infraprotect-asn-prefix named 'example' in the 'production' namespace"

### List Infraprotect Asn Prefixs

> "List all infraprotect-asn-prefixs in the 'production' namespace"

### Get Infraprotect Asn Prefix Details

> "Get details of the infraprotect-asn-prefix named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create infraprotect_asn_prefix -n <namespace> -i infraprotect_asn_prefix.yaml

# Get
f5xcctl configuration get infraprotect_asn_prefix -n <namespace> <name>

# List
f5xcctl configuration list infraprotect_asn_prefix -n <namespace>

# Delete
f5xcctl configuration delete infraprotect_asn_prefix -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_asn_prefix" "example" {
  name      = "example-infraprotect-asn-prefix"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
