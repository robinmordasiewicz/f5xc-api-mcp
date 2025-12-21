---
page_title: f5xc_dos_automitigation_rule - f5xc-api-mcp
subcategory: CDN
description: DELETE DoS Auto-Mitigation Rule for CDN Load Balancer.
---

# Dos Automitigation Rule

DELETE the corresponding DoS Auto-Mitigation Rule for the given CDN load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-dos-automitigation-rule-get` | GET DoS Auto-Mitigation Rules for CDN Load Balancer. |
| `f5xc-api-cdn-dos-automitigation-rule-delete` | DELETE DoS Auto-Mitigation Rule for CDN Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `dos_automitigation_rule_name` | DoS Mitigation Rule Name |

## Example Usage

Ask Claude to help you work with Dos Automitigation Rule resources:

### Get Dos Automitigation Rule Details

> "Get details of the dos-automitigation-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create dos_automitigation_rule -n <namespace> -i dos_automitigation_rule.yaml

# Get
f5xcctl cdn get dos_automitigation_rule <name> -n <namespace>

# List
f5xcctl cdn list dos_automitigation_rule -n <namespace>

# Delete
f5xcctl cdn delete dos_automitigation_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dos_automitigation_rule" "example" {
  name      = "example-dos-automitigation-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
