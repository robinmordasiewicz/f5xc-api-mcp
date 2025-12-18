---
page_title: f5xc_exec_log - f5xc-api-mcp
subcategory: Organization
description: Exec Log
---

# Exec Log

Retrieve exec history on node

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-exec-log-list` | Exec Log |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `site` | Site Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `line_count` | The line_count parameter |

## Example Usage

Ask Claude to help you work with Exec Log resources:

### List Exec Logs

> "List all exec-logs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f exec_log.yaml

# Get
f5xcctl get exec_log {name} -n {namespace}

# List
f5xcctl get exec_logs -n {namespace}

# Delete
f5xcctl delete exec_log {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_exec_log" "example" {
  name      = "example-exec-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
