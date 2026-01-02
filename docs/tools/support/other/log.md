---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Support
description: Log
---

# Log

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET logs for given service from the specific node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-log-list` | Log |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `service` | Service Name | `Vpm` |
| `site` | Site Name | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `last_lines` | Number of last log lines. | `200` |

## Example Usage

Ask Claude to help you work with Log resources:

### List Logs

> "List all logs in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh support create log -n <namespace> -i log.yaml

# Get
xcsh support get log <name> -n <namespace>

# List
xcsh support list log -n <namespace>

# Delete
xcsh support delete log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_log" "example" {
  name      = "example-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
