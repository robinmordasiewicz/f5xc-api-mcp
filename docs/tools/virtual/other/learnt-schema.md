---
page_title: f5xc_learnt_schema - f5xc-api-mcp
subcategory: Virtual
description: GET GET Learnt Schema per API endpoint.
---

# Learnt Schema

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET Learnt Schema per API endpoint for a given auto discovered API endpoint for Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-learnt-schema-get` | GET GET Learnt Schema per API endpoint. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Virtual Host | `Blogging-app-vhost.` |
| `namespace` | Namespace | `Blogging-app.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request | `-` |
| `collapsed_url` | API endpoint for which PDFs are requested. | `API/v1/user_id/DYN/vehicle_id/DYN.` |
| `domains` | List of domains that needs to be sent as part of the request | `www.example.com.` |
| `method` | Method of API endpoint for which PDFs are requested. | `GET` |

## Example Usage

Ask Claude to help you work with Learnt Schema resources:

### Get Learnt Schema Details

> "Get details of the learnt-schema named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh virtual create learnt_schema -n <namespace> -i learnt_schema.yaml

# Get
xcsh virtual get learnt_schema <name> -n <namespace>

# List
xcsh virtual list learnt_schema -n <namespace>

# Delete
xcsh virtual delete learnt_schema <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_learnt_schema" "example" {
  name      = "example-learnt-schema"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
