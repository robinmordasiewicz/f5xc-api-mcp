---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Observability
description: External connector log query.
---

# Log

Request to GET external connector logs that matches the criteria in request for a given
namespace.
The logs are per site per external connector is specified as match condition in the
request to GET the logs for a external connector.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-log-create` | External connector log query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `external_connector` | External connector |
| `namespace` | Namespace |
| `site` | Site |

## Example Usage

Ask Claude to help you work with Log resources:

### Create Log

> "Create a log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create log -n <namespace> -i log.yaml

# Get
f5xcctl configuration get log -n <namespace> <name>

# List
f5xcctl configuration list log -n <namespace>

# Delete
f5xcctl configuration delete log -n <namespace> <name>
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
