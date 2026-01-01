---
page_title: f5xc_voltshare_admin_policy - f5xc-api-mcp
subcategory: Blindfold
description: Create VoltShare Admin Policy.
---

# Voltshare Admin Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace voltshare_admin_policy replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-voltshare-admin-policy-create` | Create VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-get` | GET VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-list` | List VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-update` | Replace VoltShare Admin Policy. |
| `f5xc-api-blindfold-voltshare-admin-policy-delete` | DELETE VoltShare Admin Policy. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- voltshare-admin-policy

**Modifies:**

- voltshare-admin-policy

**Deletes:**

- voltshare-admin-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Voltshare Admin Policy resources:

### Create Voltshare Admin Policy

> "Create a voltshare-admin-policy named 'example' in the 'production' namespace"

### List Voltshare Admin Policys

> "List all voltshare-admin-policys in the 'production' namespace"

### Get Voltshare Admin Policy Details

> "Get details of the voltshare-admin-policy named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh blindfold create voltshare_admin_policy -n <namespace> -i voltshare_admin_policy.yaml

# Get
xcsh blindfold get voltshare_admin_policy <name> -n <namespace>

# List
xcsh blindfold list voltshare_admin_policy -n <namespace>

# Delete
xcsh blindfold delete voltshare_admin_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_voltshare_admin_policy" "example" {
  name      = "example-voltshare-admin-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
