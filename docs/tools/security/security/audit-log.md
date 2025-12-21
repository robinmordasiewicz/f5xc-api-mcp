---
page_title: f5xc_audit_log - f5xc-api-mcp
subcategory: Security
description: Audit Log Query.
---

# Audit Log

Request to GET voltshare audit logs that matches the criteria in request.
If no match conditions are
specified in the request, then the response contains all
CRUD operations performed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-audit-log-create` | Audit Log Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Audit Log resources:

### Create Audit Log

> "Create a audit-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create audit_log -n <namespace> -i audit_log.yaml

# Get
f5xcctl security get audit_log <name> -n <namespace>

# List
f5xcctl security list audit_log -n <namespace>

# Delete
f5xcctl security delete audit_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_audit_log" "example" {
  name      = "example-audit-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
