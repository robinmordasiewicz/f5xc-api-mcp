---
page_title: f5xc_api_endpoint - f5xc-api-mcp
subcategory: Organization
description: Get Service API Endpoints
---

# API Endpoint

Get all autodiscovered API endpoints for Virtual Host

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-api-endpoint-create` | Get Service API Endpoints |
| `f5xc-api-core-api-endpoint-get` | Get API Endpoints |
| `f5xc-api-core-api-endpoint-list` | Get API endpoints |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |
| `service_name` | Service |
| `name` | Virtual Host Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request |
| `apiep_category` | The apiep_category parameter |
| `domains` | The domains parameter |
| `end_time` | The end_time parameter |
| `start_time` | The start_time parameter |

## Example Usage

Ask Claude to help you work with API Endpoint resources:

### Create API Endpoint

> "Create a api-endpoint named 'example' in the 'production' namespace"

### List API Endpoints

> "List all api-endpoints in the 'production' namespace"

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
