---
page_title: f5xc_exec_log - f5xc-api-mcp
subcategory: Support
description: Exec Log
---

# Exec Log

!!! info "Low Risk"
    Operations on this resource are generally safe.

Retrieve exec history on node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-exec-log-list` | Exec Log |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `line_count` | Number of last log lines. | `200` |

## Example Usage

Ask Claude to help you work with Exec Log resources:

### List Exec Logs

> "List all exec-logs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create exec_log -n <namespace> -i exec_log.yaml

# Get
xcsh support get exec_log <name> -n <namespace>

# List
xcsh support list exec_log -n <namespace>

# Delete
xcsh support delete exec_log <name> -n <namespace>
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
