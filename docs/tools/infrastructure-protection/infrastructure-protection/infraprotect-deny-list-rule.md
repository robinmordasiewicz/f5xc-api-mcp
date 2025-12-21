---
page_title: f5xc_infraprotect_deny_list_rule - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Create DDoS transit Deny List Rule.
---

# Infraprotect Deny List Rule

List the set of infraprotect_deny_list_rule in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-infraprotect-deny-list-rule-create` | Create DDoS transit Deny List Rule. |
| `f5xc-api-infrastructureprotection-infraprotect-deny-list-rule-get` | GET Infraprotect Deny List Rule. |
| `f5xc-api-infrastructureprotection-infraprotect-deny-list-rule-list` | List Infraprotect Deny List Rule. |
| `f5xc-api-infrastructureprotection-infraprotect-deny-list-rule-update` | Replace DDoS transit Deny List Rule. |
| `f5xc-api-infrastructureprotection-infraprotect-deny-list-rule-delete` | DELETE Infraprotect Deny List Rule. |

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

Ask Claude to help you work with Infraprotect Deny List Rule resources:

### Create Infraprotect Deny List Rule

> "Create a infraprotect-deny-list-rule named 'example' in the 'production' namespace"

### List Infraprotect Deny List Rules

> "List all infraprotect-deny-list-rules in the 'production' namespace"

### Get Infraprotect Deny List Rule Details

> "Get details of the infraprotect-deny-list-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create infraprotect_deny_list_rule -n <namespace> -i infraprotect_deny_list_rule.yaml

# Get
f5xcctl infrastructure_protection get infraprotect_deny_list_rule <name> -n <namespace>

# List
f5xcctl infrastructure_protection list infraprotect_deny_list_rule -n <namespace>

# Delete
f5xcctl infrastructure_protection delete infraprotect_deny_list_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_deny_list_rule" "example" {
  name      = "example-infraprotect-deny-list-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
