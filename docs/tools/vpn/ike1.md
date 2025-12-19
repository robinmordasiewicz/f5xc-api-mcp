---
page_title: f5xc_ike1 - f5xc-api-mcp
subcategory: VPN
description: Create IKE Phase1 Profile
---

# Ike1

Shape of the IKE Phase1 Profile  configuration specification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-ike1-create` | Create IKE Phase1 Profile |
| `f5xc-api-core-ike1-get` | Get IKE Phase1 profile  configuration |
| `f5xc-api-core-ike1-list` | List IKE Phase 1 Profile |
| `f5xc-api-core-ike1-update` | Replace IKE Phase1 Profile  configuration |
| `f5xc-api-core-ike1-delete` | Delete IKE Phase 1 Profile |

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

Ask Claude to help you work with Ike1 resources:

### Create Ike1

> "Create a ike1 named 'example' in the 'production' namespace"

### List Ike1s

> "List all ike1s in the 'production' namespace"

### Get Ike1 Details

> "Get details of the ike1 named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create ike1 -n <namespace> -i ike1.yaml

# Get
f5xcctl configuration get ike1 -n <namespace> <name>

# List
f5xcctl configuration list ike1 -n <namespace>

# Delete
f5xcctl configuration delete ike1 -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_ike1" "example" {
  name      = "example-ike1"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
