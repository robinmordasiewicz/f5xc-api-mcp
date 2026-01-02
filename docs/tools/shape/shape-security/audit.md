---
page_title: f5xc_audit - f5xc-api-mcp
subcategory: Shape
description: GET SAFE Block table list.
---

# Audit

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET SAFE block table list.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-audit-list` | GET SAFE Block table list. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `dimt` | Account_id/device_id how to apply the blocking rule. | `Account_id.` |
| `dimv` | The relevant account_id/device_id. | `Goldcha` |
| `version` | The API version to use. | `V2` |

## Example Usage

Ask Claude to help you work with Audit resources:

### List Audits

> "List all audits in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create audit -n <namespace> -i audit.yaml

# Get
xcsh shape get audit <name> -n <namespace>

# List
xcsh shape list audit -n <namespace>

# Delete
xcsh shape delete audit <name> -n <namespace>
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
