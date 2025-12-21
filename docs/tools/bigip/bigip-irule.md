---
page_title: f5xc_bigip_irule - f5xc-api-mcp
subcategory: BIG-IP Integration
description: Specification.
---

# Bigip Irule

List the set of bigip_irule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-bigip-bigip-irule-create` | Specification. |
| `f5xc-api-bigip-bigip-irule-get` | Specification. |
| `f5xc-api-bigip-bigip-irule-list` | List BIG-IP iRule as a Service. |
| `f5xc-api-bigip-bigip-irule-update` | Specification. |
| `f5xc-api-bigip-bigip-irule-delete` | DELETE BIG-IP iRule as a Service. |

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

Ask Claude to help you work with Bigip Irule resources:

### Create Bigip Irule

> "Create a bigip-irule named 'example' in the 'production' namespace"

### List Bigip Irules

> "List all bigip-irules in the 'production' namespace"

### Get Bigip Irule Details

> "Get details of the bigip-irule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl bigip create bigip_irule -n <namespace> -i bigip_irule.yaml

# Get
f5xcctl bigip get bigip_irule <name> -n <namespace>

# List
f5xcctl bigip list bigip_irule -n <namespace>

# Delete
f5xcctl bigip delete bigip_irule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_bigip_irule" "example" {
  name      = "example-bigip-irule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
