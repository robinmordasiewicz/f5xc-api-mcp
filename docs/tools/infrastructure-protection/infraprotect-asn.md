---
page_title: f5xc_infraprotect_asn - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Create DDoS transit ASN
---

# Infraprotect Asn

List the set of infraprotect_asn in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-infraprotect-asn-create` | Create DDoS transit ASN |
| `f5xc-api-core-infraprotect-asn-get` | Get Infraprotect ASN |
| `f5xc-api-core-infraprotect-asn-list` | List Infraprotect ASN |
| `f5xc-api-core-infraprotect-asn-update` | Replace DDoS transit ASN |
| `f5xc-api-core-infraprotect-asn-delete` | Delete Infraprotect ASN |

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

Ask Claude to help you work with Infraprotect Asn resources:

### Create Infraprotect Asn

> "Create a infraprotect-asn named 'example' in the 'production' namespace"

### List Infraprotect Asns

> "List all infraprotect-asns in the 'production' namespace"

### Get Infraprotect Asn Details

> "Get details of the infraprotect-asn named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f infraprotect_asn.yaml

# Get
f5xcctl get infraprotect_asn {name} -n {namespace}

# List
f5xcctl get infraprotect_asns -n {namespace}

# Delete
f5xcctl delete infraprotect_asn {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_asn" "example" {
  name      = "example-infraprotect-asn"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
