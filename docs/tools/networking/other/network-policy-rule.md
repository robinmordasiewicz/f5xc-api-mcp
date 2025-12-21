---
page_title: f5xc_network_policy_rule - f5xc-api-mcp
subcategory: Networking
description: Create Network Policy Rule.
---

# Network Policy Rule

Replaces a network policy rule with configured parameters in specified namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-network-policy-rule-create` | Create Network Policy Rule. |
| `f5xc-api-networking-network-policy-rule-get` | GET Network Policy Rule. |
| `f5xc-api-networking-network-policy-rule-list` | List Network Policy Rule. |
| `f5xc-api-networking-network-policy-rule-update` | Replace Network Policy Rule. |
| `f5xc-api-networking-network-policy-rule-delete` | DELETE Network Policy Rule. |

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

Ask Claude to help you work with Network Policy Rule resources:

### Create Network Policy Rule

> "Create a network-policy-rule named 'example' in the 'production' namespace"

### List Network Policy Rules

> "List all network-policy-rules in the 'production' namespace"

### Get Network Policy Rule Details

> "Get details of the network-policy-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create network_policy_rule -n <namespace> -i network_policy_rule.yaml

# Get
f5xcctl networking get network_policy_rule <name> -n <namespace>

# List
f5xcctl networking list network_policy_rule -n <namespace>

# Delete
f5xcctl networking delete network_policy_rule <name> -n <namespace>
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
