---
page_title: f5xc_ike2 - f5xc-api-mcp
subcategory: VPN
description: Create IKE Phase2 Profile.
---

# Ike2

Shape of the IKE Phase2 Profile configuration specification.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-vpn-ike2-create` | Create IKE Phase2 Profile. |
| `f5xc-api-vpn-ike2-get` | GET IKE Phase2 profile configuration. |
| `f5xc-api-vpn-ike2-list` | List IKE Phase 2 Profile. |
| `f5xc-api-vpn-ike2-update` | Replace IKE Phase2 Profile configuration. |
| `f5xc-api-vpn-ike2-delete` | DELETE IKE Phase 2 Profile. |

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

Ask Claude to help you work with Ike2 resources:

### Create Ike2

> "Create a ike2 named 'example' in the 'production' namespace"

### List Ike2s

> "List all ike2s in the 'production' namespace"

### Get Ike2 Details

> "Get details of the ike2 named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl vpn create ike2 -n <namespace> -i ike2.yaml

# Get
f5xcctl vpn get ike2 <name> -n <namespace>

# List
f5xcctl vpn list ike2 -n <namespace>

# Delete
f5xcctl vpn delete ike2 <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_ike2" "example" {
  name      = "example-ike2"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
