---
page_title: f5xc_bgp_asn_set - f5xc-api-mcp
subcategory: Networking
description: Create BGP ASN Set.
---

# Bgp Asn Set

Replace bgp_asn_set replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-bgp-asn-set-create` | Create BGP ASN Set. |
| `f5xc-api-networking-bgp-asn-set-get` | GET BGP ASN Set. |
| `f5xc-api-networking-bgp-asn-set-list` | List BGP ASN Set. |
| `f5xc-api-networking-bgp-asn-set-update` | Replace BGP ASN Set. |
| `f5xc-api-networking-bgp-asn-set-delete` | DELETE BGP ASN Set. |

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

Ask Claude to help you work with Bgp Asn Set resources:

### Create Bgp Asn Set

> "Create a bgp-asn-set named 'example' in the 'production' namespace"

### List Bgp Asn Sets

> "List all bgp-asn-sets in the 'production' namespace"

### Get Bgp Asn Set Details

> "Get details of the bgp-asn-set named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create bgp_asn_set -n <namespace> -i bgp_asn_set.yaml

# Get
f5xcctl networking get bgp_asn_set <name> -n <namespace>

# List
f5xcctl networking list bgp_asn_set -n <namespace>

# Delete
f5xcctl networking delete bgp_asn_set <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bgp_asn_set" "example" {
  name      = "example-bgp-asn-set"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
