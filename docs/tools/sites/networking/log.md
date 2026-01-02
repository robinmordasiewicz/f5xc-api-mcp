---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Sites
description: External connector log query.
---

# Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET external connector logs that matches the criteria in request for a given
namespace.
The logs are per site per external connector is specified as match condition in the
request to GET the logs for a external connector.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-log-create` | External connector log query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `external_connector` | External connector | `Connector-1.` |
| `namespace` | Namespace | `Value` |
| `site` | Site | `CE-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- log

## Example Usage

Ask Claude to help you work with Log resources:

### Create Log

> "Create a log named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create log -n <namespace> -i log.yaml

# Get
xcsh sites get log <name> -n <namespace>

# List
xcsh sites list log -n <namespace>

# Delete
xcsh sites delete log <name> -n <namespace>
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
