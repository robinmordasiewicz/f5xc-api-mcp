---
page_title: f5xc_access_log - f5xc-api-mcp
subcategory: CDN
description: GET CDN Access Logs.
---

# Access Log

Retrieve CDN Load-Balancer Access logs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-access-log-create` | GET CDN Access Logs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Access Log resources:

### Create Access Log

> "Create a access-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl cdn create access_log -n <namespace> -i access_log.yaml

# Get
f5xcctl cdn get access_log <name> -n <namespace>

# List
f5xcctl cdn list access_log -n <namespace>

# Delete
f5xcctl cdn delete access_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_access_log" "example" {
  name      = "example-access-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
