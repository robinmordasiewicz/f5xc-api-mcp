---
page_title: f5xc_quota - f5xc-api-mcp
subcategory: Billing
description: Create Quota.
---

# Quota

Replace quota updates a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billing-quota-create` | Create Quota. |
| `f5xc-api-billing-quota-get` | GET Quota |
| `f5xc-api-billing-quota-list` | List Quota. |
| `f5xc-api-billing-quota-update` | Replace Quota. |
| `f5xc-api-billing-quota-delete` | DELETE Quota. |

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

Ask Claude to help you work with Quota resources:

### Create Quota

> "Create a quota named 'example' in the 'production' namespace"

### List Quotas

> "List all quotas in the 'production' namespace"

### Get Quota Details

> "Get details of the quota named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create quota -n <namespace> -i quota.yaml

# Get
f5xcctl configuration get quota -n <namespace> <name>

# List
f5xcctl configuration list quota -n <namespace>

# Delete
f5xcctl configuration delete quota -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_quota" "example" {
  name      = "example-quota"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
