---
page_title: f5xc_request_log - f5xc-api-mcp
subcategory: DNS
description: Get DNS Zone Request Logs
---

# Request Log

Retrieve Dns Zone Request Logs

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dns-request-log-create` | Get DNS Zone Request Logs |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Request Log resources:

### Create Request Log

> "Create a request-log named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create request_log -n <namespace> -i request_log.yaml

# Get
f5xcctl configuration get request_log -n <namespace> <name>

# List
f5xcctl configuration list request_log -n <namespace>

# Delete
f5xcctl configuration delete request_log -n <namespace> <name>
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
