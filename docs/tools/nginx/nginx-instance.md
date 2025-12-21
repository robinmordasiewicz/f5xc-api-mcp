---
page_title: f5xc_nginx_instance - f5xc-api-mcp
subcategory: Nginx
description: GET Request.
---

# Nginx Instance

List the set of nginx_instance in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginx-nginx-instance-get` | GET Request. |
| `f5xc-api-nginx-nginx-instance-list` | List NGINX One Instance Object configuration. |

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

Ask Claude to help you work with Nginx Instance resources:

### List Nginx Instances

> "List all nginx-instances in the 'production' namespace"

### Get Nginx Instance Details

> "Get details of the nginx-instance named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create nginx_instance -n <namespace> -i nginx_instance.yaml

# Get
f5xcctl configuration get nginx_instance -n <namespace> <name>

# List
f5xcctl configuration list nginx_instance -n <namespace>

# Delete
f5xcctl configuration delete nginx_instance -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_nginx_instance" "example" {
  name      = "example-nginx-instance"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
