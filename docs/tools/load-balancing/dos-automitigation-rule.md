---
page_title: f5xc_dos_automitigation_rule - f5xc-api-mcp
subcategory: Load Balancing
description: Delete DoS Auto-Mitigation Rule for HTTP Load Balancer
---

# Dos Automitigation Rule

Delete the corresponding DoS Auto-Mitigation Rule for the given HTTP load balancer

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-dos-automitigation-rule-get` | Get DoS Auto-Mitigation Rules for HTTP Load Balancer |
| `f5xc-api-waap-dos-automitigation-rule-delete` | Delete DoS Auto-Mitigation Rule for HTTP Load Balancer |

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
f5xcctl configuration create dos_automitigation_rule -n <namespace> -i dos_automitigation_rule.yaml

# Get
f5xcctl configuration get dos_automitigation_rule -n <namespace> <name>

# List
f5xcctl configuration list dos_automitigation_rule -n <namespace>

# Delete
f5xcctl configuration delete dos_automitigation_rule -n <namespace> <name>
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
