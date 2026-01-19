---
page_title: f5xc_get_security_config - f5xc-api-mcp
subcategory: CDN
description: GET Security Config for CDN Load Balancer.
---

# Get Security Config

Fetch the corresponding Security Config for the given CDN load balancers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-get-security-config-create` | GET Security Config for CDN Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |

## Configuration Choices

This resource includes mutually exclusive configuration options:

### loadbalancer_choice

| Option | Description | Recommended |
|--------|-------------|-------------|
| `all_cdn_loadbalancers` | - |  |
| `cdn_loadbalancers_list` | - |  |

## Example Usage

Ask Claude to help you work with Get Security Config resources:

### Create Get Security Config

> "Create a get-security-config named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @get_security_config.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/get_security_configs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
