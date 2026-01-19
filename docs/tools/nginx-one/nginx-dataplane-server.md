---
page_title: f5xc_nginx_dataplane_server - f5xc-api-mcp
subcategory: Nginx One
description: GET NGINX One Dataplane Servers.
---

# Nginx Dataplane Server

GET NGINX One Servers associated to an NGINX dataplane.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-nginxone-nginx-dataplane-server-create` | GET NGINX One Dataplane Servers. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Nginx Dataplane Server resources:

### Create Nginx Dataplane Server

> "Create a nginx-dataplane-server named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_dataplane_servers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_dataplane_servers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_dataplane_servers" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @nginx_dataplane_server.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nginx_dataplane_servers/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
