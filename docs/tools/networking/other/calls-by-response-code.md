---
page_title: f5xc_calls_by_response_code - f5xc-api-mcp
subcategory: Networking
description: GET Total API Calls for Virtual Host.
---

# Calls By Response Code

GET total API calls for the given Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-calls-by-response-code-create` | GET Total API Calls for Virtual Host. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Calls By Response Code resources:

### Create Calls By Response Code

> "Create a calls-by-response-code named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create calls_by_response_code -n <namespace> -i calls_by_response_code.yaml

# Get
f5xcctl networking get calls_by_response_code <name> -n <namespace>

# List
f5xcctl networking list calls_by_response_code -n <namespace>

# Delete
f5xcctl networking delete calls_by_response_code <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_calls_by_response_code" "example" {
  name      = "example-calls-by-response-code"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
