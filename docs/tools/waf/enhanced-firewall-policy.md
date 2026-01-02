---
page_title: f5xc_enhanced_firewall_policy - f5xc-api-mcp
subcategory: WAF
description: Create Enhanced Firewall Policy.
---

# Enhanced Firewall Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of enhanced_firewall_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-enhanced-firewall-policy-create` | Create Enhanced Firewall Policy. |
| `f5xc-api-waf-enhanced-firewall-policy-get` | GET Enhanced Firewall Policy. |
| `f5xc-api-waf-enhanced-firewall-policy-list` | List Enhanced Firewall Policy. |
| `f5xc-api-waf-enhanced-firewall-policy-update` | Replace Enhanced Firewall Policy. |
| `f5xc-api-waf-enhanced-firewall-policy-delete` | DELETE Enhanced Firewall Policy. |

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

- enhanced-firewall-policy

**Modifies:**

- enhanced-firewall-policy

**Deletes:**

- enhanced-firewall-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Enhanced Firewall Policy resources:

### Create Enhanced Firewall Policy

> "Create a enhanced-firewall-policy named 'example' in the 'production' namespace"

### List Enhanced Firewall Policys

> "List all enhanced-firewall-policys in the 'production' namespace"

### Get Enhanced Firewall Policy Details

> "Get details of the enhanced-firewall-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh waf create enhanced_firewall_policy -n <namespace> -i enhanced_firewall_policy.yaml

# Get
xcsh waf get enhanced_firewall_policy <name> -n <namespace>

# List
xcsh waf list enhanced_firewall_policy -n <namespace>

# Delete
xcsh waf delete enhanced_firewall_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enhanced_firewall_policy" "example" {
  name      = "example-enhanced-firewall-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
