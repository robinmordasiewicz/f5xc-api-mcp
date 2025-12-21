---
page_title: f5xc_fast_acl_rule - f5xc-api-mcp
subcategory: Security
description: Create Fast ACL Rule.
---

# Fast Acl Rule

Replace a given Fast ACL rule, `fast_acl_rule` has specification to match source IP, source port,
protocol and action to apply.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-fast-acl-rule-create` | Create Fast ACL Rule. |
| `f5xc-api-security-fast-acl-rule-get` | GET Fast ACL Rule. |
| `f5xc-api-security-fast-acl-rule-list` | List Fast ACL Rule. |
| `f5xc-api-security-fast-acl-rule-update` | Replace Fast ACL Rule. |
| `f5xc-api-security-fast-acl-rule-delete` | DELETE Fast ACL Rule. |

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

Ask Claude to help you work with Fast Acl Rule resources:

### Create Fast Acl Rule

> "Create a fast-acl-rule named 'example' in the 'production' namespace"

### List Fast Acl Rules

> "List all fast-acl-rules in the 'production' namespace"

### Get Fast Acl Rule Details

> "Get details of the fast-acl-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create fast_acl_rule -n <namespace> -i fast_acl_rule.yaml

# Get
f5xcctl security get fast_acl_rule <name> -n <namespace>

# List
f5xcctl security list fast_acl_rule -n <namespace>

# Delete
f5xcctl security delete fast_acl_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_fast_acl_rule" "example" {
  name      = "example-fast-acl-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
