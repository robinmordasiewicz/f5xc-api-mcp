---
page_title: f5xc_dos_automitigation_rule - f5xc-api-mcp
subcategory: Virtual
description: DELETE DoS Auto-Mitigation Rule for HTTP Load Balancer.
---

# Dos Automitigation Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

DELETE the corresponding DoS Auto-Mitigation Rule for the given HTTP load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-dos-automitigation-rule-get` | GET DoS Auto-Mitigation Rules for HTTP Load Balancer. |
| `f5xc-api-virtual-dos-automitigation-rule-delete` | DELETE DoS Auto-Mitigation Rule for HTTP Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |
| `dos_automitigation_rule_name` | DoS Mitigation Rule Name | `Dos-auto-mitigation-VES-I/O-HTTP-loadbalancer-ce22.` |

## Side Effects

Operations on this resource may have the following effects:

**Deletes:**

- dos-automitigation-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Dos Automitigation Rule resources:

### Get Dos Automitigation Rule Details

> "Get details of the dos-automitigation-rule named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create dos_automitigation_rule -n <namespace> -i dos_automitigation_rule.yaml

# Get
xcsh virtual get dos_automitigation_rule <name> -n <namespace>

# List
xcsh virtual list dos_automitigation_rule -n <namespace>

# Delete
xcsh virtual delete dos_automitigation_rule <name> -n <namespace>
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
