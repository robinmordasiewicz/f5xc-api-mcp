---
page_title: f5xc_alert_gen_policy - f5xc-api-mcp
subcategory: Monitoring
description: Create Alert Generation Policy
---

# Alert Gen Policy

Replaces the content of an Alert Generation Policy object

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-alert-gen-policy-create` | Create Alert Generation Policy |
| `f5xc-api-core-alert-gen-policy-get` | Get Alert Generation Policy |
| `f5xc-api-core-alert-gen-policy-list` | List BRM Alert Generation Policy |
| `f5xc-api-core-alert-gen-policy-update` | Replace Alert Generation Policy |
| `f5xc-api-core-alert-gen-policy-delete` | Delete BRM Alert Generation Policy |

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

Ask Claude to help you work with Alert Gen Policy resources:

### Create Alert Gen Policy

> "Create a alert-gen-policy named 'example' in the 'production' namespace"

### List Alert Gen Policys

> "List all alert-gen-policys in the 'production' namespace"

### Get Alert Gen Policy Details

> "Get details of the alert-gen-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create alert_gen_policy -n <namespace> -i alert_gen_policy.yaml

# Get
f5xcctl configuration get alert_gen_policy -n <namespace> <name>

# List
f5xcctl configuration list alert_gen_policy -n <namespace>

# Delete
f5xcctl configuration delete alert_gen_policy -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_alert_gen_policy" "example" {
  name      = "example-alert-gen-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
