---
page_title: f5xc_infraprotect_asn_prefix - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS transit Prefix.
---

# Infraprotect Asn Prefix

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_asn_prefix in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-asn-prefix-create` | Create DDoS transit Prefix. |
| `f5xc-api-ddos-infraprotect-asn-prefix-get` | GET Infraprotect ASN Prefix. |
| `f5xc-api-ddos-infraprotect-asn-prefix-list` | List Infraprotect ASN Prefix. |
| `f5xc-api-ddos-infraprotect-asn-prefix-update` | Replace DDoS transit Prefix. |
| `f5xc-api-ddos-infraprotect-asn-prefix-delete` | DELETE Infraprotect ASN Prefix. |

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

- infraprotect-asn-prefix

**Modifies:**

- infraprotect-asn-prefix

**Deletes:**

- infraprotect-asn-prefix
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Asn Prefix resources:

### Create Infraprotect Asn Prefix

> "Create a infraprotect-asn-prefix named 'example' in the 'production' namespace"

### List Infraprotect Asn Prefixs

> "List all infraprotect-asn-prefixs in the 'production' namespace"

### Get Infraprotect Asn Prefix Details

> "Get details of the infraprotect-asn-prefix named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create infraprotect_asn_prefix -n <namespace> -i infraprotect_asn_prefix.yaml

# Get
xcsh ddos get infraprotect_asn_prefix <name> -n <namespace>

# List
xcsh ddos list infraprotect_asn_prefix -n <namespace>

# Delete
xcsh ddos delete infraprotect_asn_prefix <name> -n <namespace>
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
