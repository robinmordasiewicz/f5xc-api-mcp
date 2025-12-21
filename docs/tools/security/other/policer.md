---
page_title: f5xc_policer - f5xc-api-mcp
subcategory: Security
description: Create Policer.
---

# Policer

Replace a given policer with changed traffic rate limits.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-policer-create` | Create Policer. |
| `f5xc-api-security-policer-get` | GET Policer. |
| `f5xc-api-security-policer-list` | List Policer. |
| `f5xc-api-security-policer-update` | Replace Policer. |
| `f5xc-api-security-policer-delete` | DELETE Policer. |

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

Ask Claude to help you work with Policer resources:

### Create Policer

> "Create a policer named 'example' in the 'production' namespace"

### List Policers

> "List all policers in the 'production' namespace"

### Get Policer Details

> "Get details of the policer named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create policer -n <namespace> -i policer.yaml

# Get
f5xcctl configuration get policer -n <namespace> <name>

# List
f5xcctl configuration list policer -n <namespace>

# Delete
f5xcctl configuration delete policer -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_policer" "example" {
  name      = "example-policer"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
