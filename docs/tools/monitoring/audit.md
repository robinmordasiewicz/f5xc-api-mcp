---
page_title: f5xc_audit - f5xc-api-mcp
subcategory: Monitoring
description: Get SAFE Block table list
---

# Audit

Get SAFE block table list

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-audit-list` | Get SAFE Block table list |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `dimt` | The dimt parameter |
| `dimv` | The dimv parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with Audit resources:

### List Audits

> "List all audits in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f audit.yaml

# Get
f5xcctl get audit {name} -n {namespace}

# List
f5xcctl get audits -n {namespace}

# Delete
f5xcctl delete audit {name} -n {namespace}
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
