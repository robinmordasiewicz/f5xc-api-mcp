---
page_title: f5xc_audit_log - f5xc-api-mcp
subcategory: Blindfold
description: Audit Log Query.
---

# Audit Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET voltshare audit logs that matches the criteria in request.
If no match conditions are
specified in the request, then the response contains all
CRUD operations performed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-audit-log-create` | Audit Log Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- audit-log

## Example Usage

Ask Claude to help you work with Audit Log resources:

### Create Audit Log

> "Create a audit-log named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh blindfold create audit_log -n <namespace> -i audit_log.yaml

# Get
xcsh blindfold get audit_log <name> -n <namespace>

# List
xcsh blindfold list audit_log -n <namespace>

# Delete
xcsh blindfold delete audit_log <name> -n <namespace>
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
