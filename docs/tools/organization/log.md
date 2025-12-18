---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Organization
description: External connector log query
---

# Log

Request to get external connector logs that matches the criteria in request for a given
namespace.
The logs are per site per external connector is specified as match condition in the
request to get the logs for a external connector.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-log-create` | External connector log query |
| `f5xc-api-core-log-list` | Log |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `external_connector` | external connector |
| `namespace` | namespace |
| `site` | site |
| `node` | Node Name |
| `service` | Service Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `last_lines` | The last_lines parameter |

## Example Usage

Ask Claude to help you work with Log resources:

### Create Log

> "Create a log named 'example' in the 'production' namespace"

### List Logs

> "List all logs in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f log.yaml

# Get
f5xcctl get log {name} -n {namespace}

# List
f5xcctl get logs -n {namespace}

# Delete
f5xcctl delete log {name} -n {namespace}
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
