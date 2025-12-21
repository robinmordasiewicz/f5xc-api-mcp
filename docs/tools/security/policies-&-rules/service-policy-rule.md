---
page_title: f5xc_service_policy_rule - f5xc-api-mcp
subcategory: Security
description: Create Service Policy Rule.
---

# Service Policy Rule

Replace service_policy_rule replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-service-policy-rule-create` | Create Service Policy Rule. |
| `f5xc-api-security-service-policy-rule-get` | GET Service Policy Rule. |
| `f5xc-api-security-service-policy-rule-list` | List Service Policy Rule. |
| `f5xc-api-security-service-policy-rule-update` | Replace Service Policy Rule. |
| `f5xc-api-security-service-policy-rule-delete` | DELETE Service Policy Rule. |

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

Ask Claude to help you work with Service Policy Rule resources:

### Create Service Policy Rule

> "Create a service-policy-rule named 'example' in the 'production' namespace"

### List Service Policy Rules

> "List all service-policy-rules in the 'production' namespace"

### Get Service Policy Rule Details

> "Get details of the service-policy-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create service_policy_rule -n <namespace> -i service_policy_rule.yaml

# Get
f5xcctl configuration get service_policy_rule -n <namespace> <name>

# List
f5xcctl configuration list service_policy_rule -n <namespace>

# Delete
f5xcctl configuration delete service_policy_rule -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_service_policy_rule" "example" {
  name      = "example-service-policy-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
