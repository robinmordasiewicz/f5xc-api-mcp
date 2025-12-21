---
page_title: f5xc_audit - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: GET SAFE Block table list.
---

# Audit

GET SAFE block table list.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-audit-list` | GET SAFE Block table list. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `dimt` | Account_id/device_id how to apply the blocking rule. |
| `dimv` | The relevant account_id/device_id. |
| `version` | The API version to use. |

## Example Usage

Ask Claude to help you work with Audit resources:

### List Audits

> "List all audits in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create audit -n <namespace> -i audit.yaml

# Get
f5xcctl configuration get audit -n <namespace> <name>

# List
f5xcctl configuration list audit -n <namespace>

# Delete
f5xcctl configuration delete audit -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_audit" "example" {
  name      = "example-audit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
