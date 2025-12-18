---
page_title: f5xc_nginx_instance - f5xc-api-mcp
subcategory: Organization
description: Get Request
---

# Nginx Instance

List the set of nginx_instance in a namespace

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-nginx-instance-get` | Get Request |
| `f5xc-api-core-nginx-instance-list` | List NGINX One Instance Object configuration |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl apply -f nginx_instance.yaml

# Get
f5xcctl get nginx_instance {name} -n {namespace}

# List
f5xcctl get nginx_instances -n {namespace}

# Delete
f5xcctl delete nginx_instance {name} -n {namespace}
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
