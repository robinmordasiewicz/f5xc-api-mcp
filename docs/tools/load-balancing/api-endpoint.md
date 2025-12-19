---
page_title: f5xc_api_endpoint - f5xc-api-mcp
subcategory: Load Balancing
description: Get API Endpoints
---

# API Endpoint

Get list of all API Endpoints associated with the HTTP loadbalancer in format suitable for API
Groups management.
Deprecated: instead use GetAPIEndpoints in
f5xc.io.schema.virtual_host.ApiepCustomAPI

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-api-endpoint-create` | Get API Endpoints |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Http LoadBalancer Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with API Endpoint resources:

### Create API Endpoint

> "Create a api-endpoint named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create api_endpoint -n <namespace> -i api_endpoint.yaml

# Get
f5xcctl configuration get api_endpoint -n <namespace> <name>

# List
f5xcctl configuration list api_endpoint -n <namespace>

# Delete
f5xcctl configuration delete api_endpoint -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_api_endpoint" "example" {
  name      = "example-api-endpoint"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
