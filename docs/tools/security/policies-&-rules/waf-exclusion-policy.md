---
page_title: f5xc_waf_exclusion_policy - f5xc-api-mcp
subcategory: Security
description: Create WAF Exclusion Policy.
---

# WAF Exclusion Policy

List the set of waf_exclusion_policy in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-waf-exclusion-policy-create` | Create WAF Exclusion Policy. |
| `f5xc-api-security-waf-exclusion-policy-get` | GET WAF Exclusion Policy. |
| `f5xc-api-security-waf-exclusion-policy-list` | List WAF Exclusion Policy. |
| `f5xc-api-security-waf-exclusion-policy-update` | Replace WAF Exclusion Policy. |
| `f5xc-api-security-waf-exclusion-policy-delete` | DELETE WAF Exclusion Policy. |

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

Ask Claude to help you work with WAF Exclusion Policy resources:

### Create WAF Exclusion Policy

> "Create a waf-exclusion-policy named 'example' in the 'production' namespace"

### List WAF Exclusion Policys

> "List all waf-exclusion-policys in the 'production' namespace"

### Get WAF Exclusion Policy Details

> "Get details of the waf-exclusion-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create waf_exclusion_policy -n <namespace> -i waf_exclusion_policy.yaml

# Get
f5xcctl security get waf_exclusion_policy <name> -n <namespace>

# List
f5xcctl security list waf_exclusion_policy -n <namespace>

# Delete
f5xcctl security delete waf_exclusion_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_waf_exclusion_policy" "example" {
  name      = "example-waf-exclusion-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
