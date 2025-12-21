---
page_title: f5xc_infraprotect_firewall_ruleset - f5xc-api-mcp
subcategory: Infrastructure Protection
description: GET Infraprotect Firewall Ruleset.
---

# Infraprotect Firewall Ruleset

List the set of infraprotect_firewall_ruleset in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-infraprotect-firewall-ruleset-get` | GET Infraprotect Firewall Ruleset. |
| `f5xc-api-infrastructureprotection-infraprotect-firewall-ruleset-list` | List Infraprotect Firewall Ruleset. |
| `f5xc-api-infrastructureprotection-infraprotect-firewall-ruleset-update` | Replace DDoS transit Firewall Ruleset. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |
| `metadata.namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Infraprotect Firewall Ruleset resources:

### List Infraprotect Firewall Rulesets

> "List all infraprotect-firewall-rulesets in the 'production' namespace"

### Get Infraprotect Firewall Ruleset Details

> "Get details of the infraprotect-firewall-ruleset named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create infraprotect_firewall_ruleset -n <namespace> -i infraprotect_firewall_ruleset.yaml

# Get
f5xcctl configuration get infraprotect_firewall_ruleset -n <namespace> <name>

# List
f5xcctl configuration list infraprotect_firewall_ruleset -n <namespace>

# Delete
f5xcctl configuration delete infraprotect_firewall_ruleset -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_firewall_ruleset" "example" {
  name      = "example-infraprotect-firewall-ruleset"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
