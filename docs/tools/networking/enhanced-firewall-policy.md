---
page_title: f5xc_enhanced_firewall_policy - f5xc-api-mcp
subcategory: Networking
description: Create Enhanced Firewall Policy
---

# Enhanced Firewall Policy

List the set of enhanced_firewall_policy in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-enhanced-firewall-policy-create` | Create Enhanced Firewall Policy |
| `f5xc-api-network-enhanced-firewall-policy-get` | Get Enhanced Firewall Policy |
| `f5xc-api-network-enhanced-firewall-policy-list` | List Enhanced Firewall Policy |
| `f5xc-api-network-enhanced-firewall-policy-update` | Replace Enhanced Firewall Policy |
| `f5xc-api-network-enhanced-firewall-policy-delete` | Delete Enhanced Firewall Policy |

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

Ask Claude to help you work with Enhanced Firewall Policy resources:

### Create Enhanced Firewall Policy

> "Create a enhanced-firewall-policy named 'example' in the 'production' namespace"

### List Enhanced Firewall Policys

> "List all enhanced-firewall-policys in the 'production' namespace"

### Get Enhanced Firewall Policy Details

> "Get details of the enhanced-firewall-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f enhanced_firewall_policy.yaml

# Get
f5xcctl get enhanced_firewall_policy {name} -n {namespace}

# List
f5xcctl get enhanced_firewall_policys -n {namespace}

# Delete
f5xcctl delete enhanced_firewall_policy {name} -n {namespace}
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
