---
page_title: f5xc_voltshare_admin_policy - f5xc-api-mcp
subcategory: Security
description: Create VoltShare Admin Policy.
---

# Voltshare Admin Policy

Replace voltshare_admin_policy replaces an existing object in the storage backend for
metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-voltshare-admin-policy-create` | Create VoltShare Admin Policy. |
| `f5xc-api-security-voltshare-admin-policy-get` | GET VoltShare Admin Policy. |
| `f5xc-api-security-voltshare-admin-policy-list` | List VoltShare Admin Policy. |
| `f5xc-api-security-voltshare-admin-policy-update` | Replace VoltShare Admin Policy. |
| `f5xc-api-security-voltshare-admin-policy-delete` | DELETE VoltShare Admin Policy. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Voltshare Admin Policy resources:

### Create Voltshare Admin Policy

> "Create a voltshare-admin-policy named 'example' in the 'production' namespace"

### List Voltshare Admin Policys

> "List all voltshare-admin-policys in the 'production' namespace"

### Get Voltshare Admin Policy Details

> "Get details of the voltshare-admin-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create voltshare_admin_policy -n <namespace> -i voltshare_admin_policy.yaml

# Get
f5xcctl configuration get voltshare_admin_policy -n <namespace> <name>

# List
f5xcctl configuration list voltshare_admin_policy -n <namespace>

# Delete
f5xcctl configuration delete voltshare_admin_policy -n <namespace> <name>
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
