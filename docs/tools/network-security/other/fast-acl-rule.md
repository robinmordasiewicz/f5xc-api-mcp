---
page_title: f5xc_fast_acl_rule - f5xc-api-mcp
subcategory: Network Security
description: Create Fast ACL Rule.
---

# Fast Acl Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace a given Fast ACL rule, `fast_acl_rule` has specification to match source IP, source port,
protocol and action to apply.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-fast-acl-rule-create` | Create Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-get` | GET Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-list` | List Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-update` | Replace Fast ACL Rule. |
| `f5xc-api-networksecurity-fast-acl-rule-delete` | DELETE Fast ACL Rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- fast-acl-rule

**Modifies:**

- fast-acl-rule

**Deletes:**

- fast-acl-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Fast Acl Rule resources:

### Create Fast Acl Rule

> "Create a fast-acl-rule named 'example' in the 'production' namespace"

### List Fast Acl Rules

> "List all fast-acl-rules in the 'production' namespace"

### Get Fast Acl Rule Details

> "Get details of the fast-acl-rule named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create fast_acl_rule -n <namespace> -i fast_acl_rule.yaml

# Get
xcsh network_security get fast_acl_rule <name> -n <namespace>

# List
xcsh network_security list fast_acl_rule -n <namespace>

# Delete
xcsh network_security delete fast_acl_rule <name> -n <namespace>
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
