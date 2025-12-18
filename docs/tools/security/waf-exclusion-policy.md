---
page_title: f5xc_waf_exclusion_policy - f5xc-api-mcp
subcategory: Security
description: Create WAF Exclusion Policy
---

# WAF Exclusion Policy

List the set of waf_exclusion_policy in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-waf-exclusion-policy-create` | Create WAF Exclusion Policy |
| `f5xc-api-security-waf-exclusion-policy-get` | Get WAF Exclusion Policy |
| `f5xc-api-security-waf-exclusion-policy-list` | List WAF Exclusion Policy |
| `f5xc-api-security-waf-exclusion-policy-update` | Replace WAF Exclusion Policy |
| `f5xc-api-security-waf-exclusion-policy-delete` | Delete WAF Exclusion Policy |

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
f5xcctl apply -f waf_exclusion_policy.yaml

# Get
f5xcctl get waf_exclusion_policy {name} -n {namespace}

# List
f5xcctl get waf_exclusion_policys -n {namespace}

# Delete
f5xcctl delete waf_exclusion_policy {name} -n {namespace}
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
