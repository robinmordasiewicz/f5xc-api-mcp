---
page_title: f5xc_nginx_service_discovery - f5xc-api-mcp
subcategory: Nginx
description: Create NGINX Service Discovery.
---

# Nginx Service Discovery

API to replace NGINX Service Discovery object for a site or virtual site in system namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginx-nginx-service-discovery-create` | Create NGINX Service Discovery. |
| `f5xc-api-nginx-nginx-service-discovery-get` | GET NGINX Service Discovery. |
| `f5xc-api-nginx-nginx-service-discovery-list` | List NGINX Service Discovery. |
| `f5xc-api-nginx-nginx-service-discovery-update` | Replace NGINX Service Discovery. |
| `f5xc-api-nginx-nginx-service-discovery-delete` | DELETE NGINX Service Discovery. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Nginx Service Discovery resources:

### Create Nginx Service Discovery

> "Create a nginx-service-discovery named 'example' in the 'production' namespace"

### List Nginx Service Discoverys

> "List all nginx-service-discoverys in the 'production' namespace"

### Get Nginx Service Discovery Details

> "Get details of the nginx-service-discovery named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create nginx_service_discovery -n <namespace> -i nginx_service_discovery.yaml

# Get
f5xcctl configuration get nginx_service_discovery -n <namespace> <name>

# List
f5xcctl configuration list nginx_service_discovery -n <namespace>

# Delete
f5xcctl configuration delete nginx_service_discovery -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_nginx_service_discovery" "example" {
  name      = "example-nginx-service-discovery"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
