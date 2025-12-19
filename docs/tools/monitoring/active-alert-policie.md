---
page_title: f5xc_active_alert_policie - f5xc-api-mcp
subcategory: Monitoring
description: Set Active Alert Policies
---

# Active Alert Policie

SetActiveAlertPolicies sets the active alert policies for the namespace
An emtpy list in the request
will clear the active alert policies for the namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-active-alert-policie-create` | Set Active Alert Policies |
| `f5xc-api-core-active-alert-policie-list` | Get Active Alert Policies |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Active Alert Policie resources:

### Create Active Alert Policie

> "Create a active-alert-policie named 'example' in the 'production' namespace"

### List Active Alert Policies

> "List all active-alert-policies in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f active_alert_policie.yaml

# Get
f5xcctl get active_alert_policie {name} -n {namespace}

# List
f5xcctl get active_alert_policies -n {namespace}

# Delete
f5xcctl delete active_alert_policie {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_active_alert_policie" "example" {
  name      = "example-active-alert-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
