---
page_title: f5xc_nginx_server - f5xc-api-mcp
subcategory: Nginx
description: GET Request.
---

# Nginx Server

List the set of nginx_server in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginx-nginx-server-get` | GET Request. |
| `f5xc-api-nginx-nginx-server-list` | List NGINX One Server APIs. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Nginx Server resources:

### List Nginx Servers

> "List all nginx-servers in the 'production' namespace"

### Get Nginx Server Details

> "Get details of the nginx-server named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl nginx create nginx_server -n <namespace> -i nginx_server.yaml

# Get
f5xcctl nginx get nginx_server <name> -n <namespace>

# List
f5xcctl nginx list nginx_server -n <namespace>

# Delete
f5xcctl nginx delete nginx_server <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_nginx_server" "example" {
  name      = "example-nginx-server"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
