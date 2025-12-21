---
page_title: f5xc_api_endpoint - f5xc-api-mcp
subcategory: Applications
description: GET Service API Endpoints.
---

# API Endpoint

GET all auto discovered API endpoints for App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-applications-api-endpoint-create` | GET Service API Endpoints. |
| `f5xc-api-applications-api-endpoint-list` | GET API endpoints. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |
| `service_name` | Service |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request |

## Example Usage

Ask Claude to help you work with API Endpoint resources:

### Create API Endpoint

> "Create a api-endpoint named 'example' in the 'production' namespace"

### List API Endpoints

> "List all api-endpoints in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl applications create api_endpoint -n <namespace> -i api_endpoint.yaml

# Get
f5xcctl applications get api_endpoint <name> -n <namespace>

# List
f5xcctl applications list api_endpoint -n <namespace>

# Delete
f5xcctl applications delete api_endpoint <name> -n <namespace>
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
