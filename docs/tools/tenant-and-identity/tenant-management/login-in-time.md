---
page_title: f5xc_login_in_time - f5xc-api-mcp
subcategory: Tenant And Identity
description: GetLoginEventsInTimeFrame.
---

# Login In Time

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GetLoginEventsInTimeFrame returns login events for specified period of time. It consider all users
specified by context tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-login-in-time-create` | GetLoginEventsInTimeFrame. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- login-in-time

## Example Usage

Ask Claude to help you work with Login In Time resources:

### Create Login In Time

> "Create a login-in-time named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create login_in_time -n <namespace> -i login_in_time.yaml

# Get
xcsh tenant_and_identity get login_in_time <name> -n <namespace>

# List
xcsh tenant_and_identity list login_in_time -n <namespace>

# Delete
xcsh tenant_and_identity delete login_in_time <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_login_in_time" "example" {
  name      = "example-login-in-time"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
