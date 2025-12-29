---
page_title: f5xc_active_alert_policie - f5xc-api-mcp
subcategory: Tenant And Identity
description: Set Active Alert Policies.
---

# Active Alert Policie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

SetActiveAlertPolicies sets the active alert policies for the namespace
An emtpy list in the request
will clear the active alert policies for the namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-active-alert-policie-create` | Set Active Alert Policies. |
| `f5xc-api-tenantandidentity-active-alert-policie-list` | GET Active Alert Policies. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- active-alert-policie

## Example Usage

Ask Claude to help you work with Active Alert Policie resources:

### Create Active Alert Policie

> "Create a active-alert-policie named 'example' in the 'production' namespace"

### List Active Alert Policies

> "List all active-alert-policies in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config active-alert-policie create {name} --namespace {namespace}
```

Create active-alert-policie

### file_based

```bash
f5xcctl config active-alert-policie create -f {file}.yaml
```

Create from YAML file

### list_all

```bash
f5xcctl config active-alert-policie list --namespace {namespace}
```

List all active-alert-policies

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create active_alert_policie -n <namespace> -i active_alert_policie.yaml

# Get
f5xcctl tenant_and_identity get active_alert_policie <name> -n <namespace>

# List
f5xcctl tenant_and_identity list active_alert_policie -n <namespace>

# Delete
f5xcctl tenant_and_identity delete active_alert_policie <name> -n <namespace>
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
