---
page_title: f5xc_infraprotect_firewall_rule - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Create DDoS transit Firewall Rule
---

# Infraprotect Firewall Rule

List the set of infraprotect_firewall_rule in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-infraprotect-firewall-rule-create` | Create DDoS transit Firewall Rule |
| `f5xc-api-core-infraprotect-firewall-rule-get` | Get Infraprotect Firewall Rule |
| `f5xc-api-core-infraprotect-firewall-rule-list` | List Infraprotect Firewall Rule |
| `f5xc-api-core-infraprotect-firewall-rule-update` | Replace DDoS transit Firewall Rule |
| `f5xc-api-core-infraprotect-firewall-rule-delete` | Delete Infraprotect Firewall Rule |

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

Ask Claude to help you work with Infraprotect Firewall Rule resources:

### Create Infraprotect Firewall Rule

> "Create a infraprotect-firewall-rule named 'example' in the 'production' namespace"

### List Infraprotect Firewall Rules

> "List all infraprotect-firewall-rules in the 'production' namespace"

### Get Infraprotect Firewall Rule Details

> "Get details of the infraprotect-firewall-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f infraprotect_firewall_rule.yaml

# Get
f5xcctl get infraprotect_firewall_rule {name} -n {namespace}

# List
f5xcctl get infraprotect_firewall_rules -n {namespace}

# Delete
f5xcctl delete infraprotect_firewall_rule {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_firewall_rule" "example" {
  name      = "example-infraprotect-firewall-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
