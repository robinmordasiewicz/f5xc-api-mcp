---
page_title: f5xc_infraprotect_firewall_ruleset - f5xc-api-mcp
subcategory: Ddos
description: GET Infraprotect Firewall Ruleset.
---

# Infraprotect Firewall Ruleset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of infraprotect_firewall_ruleset in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-firewall-ruleset-get` | GET Infraprotect Firewall Ruleset. |
| `f5xc-api-ddos-infraprotect-firewall-ruleset-list` | List Infraprotect Firewall Ruleset. |
| `f5xc-api-ddos-infraprotect-firewall-ruleset-update` | Replace DDoS transit Firewall Ruleset. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- infraprotect-firewall-ruleset

## Example Usage

Ask Claude to help you work with Infraprotect Firewall Ruleset resources:

### List Infraprotect Firewall Rulesets

> "List all infraprotect-firewall-rulesets in the 'production' namespace"

### Get Infraprotect Firewall Ruleset Details

> "Get details of the infraprotect-firewall-ruleset named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh ddos create infraprotect_firewall_ruleset -n <namespace> -i infraprotect_firewall_ruleset.yaml

# Get
xcsh ddos get infraprotect_firewall_ruleset <name> -n <namespace>

# List
xcsh ddos list infraprotect_firewall_ruleset -n <namespace>

# Delete
xcsh ddos delete infraprotect_firewall_ruleset <name> -n <namespace>
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
