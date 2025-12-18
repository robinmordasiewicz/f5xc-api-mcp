---
page_title: f5xc_audit_log - f5xc-api-mcp
subcategory: Monitoring
description: Audit Log Query
---

# Audit Log

Request to get voltshare audit logs that matches the criteria in request.
If no match conditions are
specified in the request, then the response contains all
CRUD operations performed.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-audit-log-create` | Audit Log Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Audit Log resources:

### Create Audit Log

> "Create a audit-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f audit_log.yaml

# Get
f5xcctl get audit_log {name} -n {namespace}

# List
f5xcctl get audit_logs -n {namespace}

# Delete
f5xcctl delete audit_log {name} -n {namespace}
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
