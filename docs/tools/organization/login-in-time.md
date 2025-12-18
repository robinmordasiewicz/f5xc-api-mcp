---
page_title: f5xc_login_in_time - f5xc-api-mcp
subcategory: Organization
description: GetLoginEventsInTimeFrame
---

# Login In Time

GetLoginEventsInTimeFrame returns login events for specified period of time. It consider all users
specified by context tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-login-in-time-create` | GetLoginEventsInTimeFrame |

## Example Usage

Ask Claude to help you work with Login In Time resources:

### Create Login In Time

> "Create a login-in-time named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f login_in_time.yaml

# Get
f5xcctl get login_in_time {name} -n {namespace}

# List
f5xcctl get login_in_times -n {namespace}

# Delete
f5xcctl delete login_in_time {name} -n {namespace}
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
