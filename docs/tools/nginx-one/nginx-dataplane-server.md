---
page_title: f5xc_nginx_dataplane_server - f5xc-api-mcp
subcategory: Nginx One
description: GET NGINX One Dataplane Servers.
---

# Nginx Dataplane Server

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET NGINX One Servers associated to an NGINX dataplane.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginxone-nginx-dataplane-server-create` | GET NGINX One Dataplane Servers. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- nginx-dataplane-server

## Example Usage

Ask Claude to help you work with Nginx Dataplane Server resources:

### Create Nginx Dataplane Server

> "Create a nginx-dataplane-server named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh nginx_one create nginx_dataplane_server -n <namespace> -i nginx_dataplane_server.yaml

# Get
xcsh nginx_one get nginx_dataplane_server <name> -n <namespace>

# List
xcsh nginx_one list nginx_dataplane_server -n <namespace>

# Delete
xcsh nginx_one delete nginx_dataplane_server <name> -n <namespace>
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
