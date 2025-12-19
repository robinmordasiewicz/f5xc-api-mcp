---
page_title: f5xc_learnt_schema - f5xc-api-mcp
subcategory: API Security
description: Get Learnt Schema per API endpoint
---

# Learnt Schema

Get Learnt Schema per API endpoint for a given auto discovered API endpoint for Virtual Host

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-learnt-schema-create` | Get Learnt Schema per API endpoint |
| `f5xc-api-core-learnt-schema-get` | Get Get Learnt Schema per API endpoint |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `app_type_name` | App Type |
| `namespace` | Namespace |
| `name` | Virtual Host |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `api_endpoint_info_request` | List of additional things that needs to be sent as part of the request |
| `collapsed_url` | The collapsed_url parameter |
| `domains` | The domains parameter |
| `method` | The method parameter |

## Example Usage

Ask Claude to help you work with Learnt Schema resources:

### Create Learnt Schema

> "Create a learnt-schema named 'example' in the 'production' namespace"

### Get Learnt Schema Details

> "Get details of the learnt-schema named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create learnt_schema -n <namespace> -i learnt_schema.yaml

# Get
f5xcctl configuration get learnt_schema -n <namespace> <name>

# List
f5xcctl configuration list learnt_schema -n <namespace>

# Delete
f5xcctl configuration delete learnt_schema -n <namespace> <name>
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
