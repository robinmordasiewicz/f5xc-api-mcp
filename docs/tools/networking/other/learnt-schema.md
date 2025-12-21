---
page_title: f5xc_learnt_schema - f5xc-api-mcp
subcategory: Networking
description: GET GET Learnt Schema per API endpoint.
---

# Learnt Schema

GET Learnt Schema per API endpoint for a given auto discovered API endpoint for Virtual Host.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-learnt-schema-get` | GET GET Learnt Schema per API endpoint. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Virtual Host |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request |
| `collapsed_url` | API endpoint for which PDFs are requested. |
| `domains` | List of domains that needs to be sent as part of the request |
| `method` | Method of API endpoint for which PDFs are requested. |

## Example Usage

Ask Claude to help you work with Learnt Schema resources:

### Get Learnt Schema Details

> "Get details of the learnt-schema named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create learnt_schema -n <namespace> -i learnt_schema.yaml

# Get
f5xcctl networking get learnt_schema <name> -n <namespace>

# List
f5xcctl networking list learnt_schema -n <namespace>

# Delete
f5xcctl networking delete learnt_schema <name> -n <namespace>
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
