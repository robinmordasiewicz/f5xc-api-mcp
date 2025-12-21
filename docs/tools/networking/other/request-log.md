---
page_title: f5xc_request_log - f5xc-api-mcp
subcategory: Networking
description: GET DNS Zone Request Logs.
---

# Request Log

Retrieve DNS Zone Request Logs.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-request-log-create` | GET DNS Zone Request Logs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Request Log resources:

### Create Request Log

> "Create a request-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create request_log -n <namespace> -i request_log.yaml

# Get
f5xcctl networking get request_log <name> -n <namespace>

# List
f5xcctl networking list request_log -n <namespace>

# Delete
f5xcctl networking delete request_log <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_request_log" "example" {
  name      = "example-request-log"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
