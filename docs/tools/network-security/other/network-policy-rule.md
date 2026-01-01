---
page_title: f5xc_network_policy_rule - f5xc-api-mcp
subcategory: Network Security
description: Create Network Policy Rule.
---

# Network Policy Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replaces a network policy rule with configured parameters in specified namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-network-policy-rule-create` | Create Network Policy Rule. |
| `f5xc-api-networksecurity-network-policy-rule-get` | GET Network Policy Rule. |
| `f5xc-api-networksecurity-network-policy-rule-list` | List Network Policy Rule. |
| `f5xc-api-networksecurity-network-policy-rule-update` | Replace Network Policy Rule. |
| `f5xc-api-networksecurity-network-policy-rule-delete` | DELETE Network Policy Rule. |

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

- network-policy-rule

**Modifies:**

- network-policy-rule

**Deletes:**

- network-policy-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Network Policy Rule resources:

### Create Network Policy Rule

> "Create a network-policy-rule named 'example' in the 'production' namespace"

### List Network Policy Rules

> "List all network-policy-rules in the 'production' namespace"

### Get Network Policy Rule Details

> "Get details of the network-policy-rule named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create network_policy_rule -n <namespace> -i network_policy_rule.yaml

# Get
xcsh network_security get network_policy_rule <name> -n <namespace>

# List
xcsh network_security list network_policy_rule -n <namespace>

# Delete
xcsh network_security delete network_policy_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_network_policy_rule" "example" {
  name      = "example-network-policy-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
