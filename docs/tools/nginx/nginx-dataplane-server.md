---
page_title: f5xc_nginx_dataplane_server - f5xc-api-mcp
subcategory: Nginx
description: GET NGINX One Dataplane Servers.
---

# Nginx Dataplane Server

GET NGINX One Servers associated to an NGINX dataplane.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginx-nginx-dataplane-server-create` | GET NGINX One Dataplane Servers. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Nginx Dataplane Server resources:

### Create Nginx Dataplane Server

> "Create a nginx-dataplane-server named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create nginx_dataplane_server -n <namespace> -i nginx_dataplane_server.yaml

# Get
f5xcctl configuration get nginx_dataplane_server -n <namespace> <name>

# List
f5xcctl configuration list nginx_dataplane_server -n <namespace>

# Delete
f5xcctl configuration delete nginx_dataplane_server -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_nginx_dataplane_server" "example" {
  name      = "example-nginx-dataplane-server"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
