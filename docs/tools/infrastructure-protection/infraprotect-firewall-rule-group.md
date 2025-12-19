---
page_title: f5xc_infraprotect_firewall_rule_group - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Replace DDoS transit Firewall Rule Group
---

# Infraprotect Firewall Rule Group

List the set of infraprotect_firewall_rule_group in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-infraprotect-firewall-rule-group-create` | Replace DDoS transit Firewall Rule Group |
| `f5xc-api-core-infraprotect-firewall-rule-group-get` | Get Infraprotect Firewall Rule Group |
| `f5xc-api-core-infraprotect-firewall-rule-group-list` | List Infraprotect Firewall Rule Group |
| `f5xc-api-core-infraprotect-firewall-rule-group-update` | Replace DDoS transit Firewall Rule Group |
| `f5xc-api-core-infraprotect-firewall-rule-group-delete` | Delete Infraprotect Firewall Rule Group |

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

Ask Claude to help you work with Infraprotect Firewall Rule Group resources:

### Create Infraprotect Firewall Rule Group

> "Create a infraprotect-firewall-rule-group named 'example' in the 'production' namespace"

### List Infraprotect Firewall Rule Groups

> "List all infraprotect-firewall-rule-groups in the 'production' namespace"

### Get Infraprotect Firewall Rule Group Details

> "Get details of the infraprotect-firewall-rule-group named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f infraprotect_firewall_rule_group.yaml

# Get
f5xcctl get infraprotect_firewall_rule_group {name} -n {namespace}

# List
f5xcctl get infraprotect_firewall_rule_groups -n {namespace}

# Delete
f5xcctl delete infraprotect_firewall_rule_group {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_infraprotect_firewall_rule_group" "example" {
  name      = "example-infraprotect-firewall-rule-group"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
