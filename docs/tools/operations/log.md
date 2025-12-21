---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Operations
description: Log
---

# Log

GET logs for given service from the specific node.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-log-list` | Log |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `node` | Node Name |
| `service` | Service Name |
| `site` | Site Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `last_lines` | Number of last log lines. |

## Example Usage

Ask Claude to help you work with Log resources:

### List Logs

> "List all logs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create log -n <namespace> -i log.yaml

# Get
f5xcctl operations get log <name> -n <namespace>

# List
f5xcctl operations list log -n <namespace>

# Delete
f5xcctl operations delete log <name> -n <namespace>
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
