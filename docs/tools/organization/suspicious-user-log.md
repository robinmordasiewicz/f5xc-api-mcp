---
page_title: f5xc_suspicious_user_log - f5xc-api-mcp
subcategory: Organization
description: Suspicious User Logs Query
---

# Suspicious User Log

Get suspicious user logs for the given namespace.
For `system` namespace, all suspicious users logs
for the tenant matching the query specified
in the request will be returned in the response. User
may query suspicious user logs that matches various
fields such as `vh_name`, `user`, `site`,
`city`, `country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-suspicious-user-log-create` | Suspicious User Logs Query |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Suspicious User Log resources:

### Create Suspicious User Log

> "Create a suspicious-user-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f suspicious_user_log.yaml

# Get
f5xcctl get suspicious_user_log {name} -n {namespace}

# List
f5xcctl get suspicious_user_logs -n {namespace}

# Delete
f5xcctl delete suspicious_user_log {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_suspicious_user_log" "example" {
  name      = "example-suspicious-user-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
