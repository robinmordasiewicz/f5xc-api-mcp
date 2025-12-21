---
page_title: f5xc_api_endpoint - f5xc-api-mcp
subcategory: Networking
description: GET API Endpoint.
---

# API Endpoint

GET all autodiscovered API endpoints for Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-api-endpoint-create` | GET API Endpoint. |
| `f5xc-api-networking-api-endpoint-get` | GET API Endpoints. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request |
| `apiep_category` | Category of API endpoints. Can be DISCOVERED, INVENTORY or SHADOW API. |
| `domains` | List of domains that needs to be sent as part of the request |
| `end_time` | Format: `unix_timestamp` or `RFC 3339` |
| `start_time` | Format: `unix_timestamp` or `RFC 3339` |

## Example Usage

Ask Claude to help you work with API Endpoint resources:

### Create API Endpoint

> "Create a api-endpoint named 'example' in the 'production' namespace"

### Get API Endpoint Details

> "Get details of the api-endpoint named 'example' in namespace 'production'"

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
