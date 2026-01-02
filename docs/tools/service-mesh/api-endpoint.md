---
page_title: f5xc_api_endpoint - f5xc-api-mcp
subcategory: Service Mesh
description: GET Service API Endpoints.
---

# API Endpoint

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET all auto discovered API endpoints for App type.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-api-endpoint-create` | GET Service API Endpoints. |
| `f5xc-api-servicemesh-api-endpoint-list` | GET API endpoints. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `app_type_name` | App Type | `Blogging-app.` |
| `namespace` | Namespace | `Shared` |
| `service_name` | Service | `N:public or S:productpage.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- api-endpoint

## Example Usage

Ask Claude to help you work with API Endpoint resources:

### Create API Endpoint

> "Create a api-endpoint named 'example' in the 'production' namespace"

### List API Endpoints

> "List all api-endpoints in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh service_mesh create api_endpoint -n <namespace> -i api_endpoint.yaml

# Get
xcsh service_mesh get api_endpoint <name> -n <namespace>

# List
xcsh service_mesh list api_endpoint -n <namespace>

# Delete
xcsh service_mesh delete api_endpoint <name> -n <namespace>
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
