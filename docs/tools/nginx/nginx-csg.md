---
page_title: f5xc_nginx_csg - f5xc-api-mcp
subcategory: Nginx
description: GET Request.
---

# Nginx Csg

List the set of nginx_csg in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginx-nginx-csg-get` | GET Request. |
| `f5xc-api-nginx-nginx-csg-list` | List NGINX One CSG Object configuration. |

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

Ask Claude to help you work with Nginx Csg resources:

### List Nginx Csgs

> "List all nginx-csgs in the 'production' namespace"

### Get Nginx Csg Details

> "Get details of the nginx-csg named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create nginx_csg -n <namespace> -i nginx_csg.yaml

# Get
f5xcctl configuration get nginx_csg -n <namespace> <name>

# List
f5xcctl configuration list nginx_csg -n <namespace>

# Delete
f5xcctl configuration delete nginx_csg -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_nginx_csg" "example" {
  name      = "example-nginx-csg"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
