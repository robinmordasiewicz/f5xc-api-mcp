---
page_title: f5xc_history - f5xc-api-mcp
subcategory: Organization
description: Get the change history for a bot detection rule
---

# History

Get the history of alert notifications sent to the end-user between the start_time and end_time that
matches the
filter specified in the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-history-get` | Get the change history for a bot detection rule |
| `f5xc-api-core-history-list` | Get Alerts History |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | The end_time parameter |
| `filter` | The filter parameter |
| `start_time` | The start_time parameter |

## Example Usage

Ask Claude to help you work with History resources:

### List Historys

> "List all historys in the 'production' namespace"

### Get History Details

> "Get details of the history named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f history.yaml

# Get
f5xcctl get history {name} -n {namespace}

# List
f5xcctl get historys -n {namespace}

# Delete
f5xcctl delete history {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_history" "example" {
  name      = "example-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
