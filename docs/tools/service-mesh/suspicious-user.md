---
page_title: f5xc_suspicious_user - f5xc-api-mcp
subcategory: Service Mesh
description: GET Status of Suspicious users.
---

# Suspicious User

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET status of suspicious users.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-suspicious-user-get` | GET Status of Suspicious users. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Value` |
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | Fetch suspicious users during timestamp <= end_time | `1570007981.` |
| `query` | Blogging_app"}" | `Query={app_type=.` |
| `start_time` | Fetch suspicious users during timestamp >= start_time | `1570007981.` |
| `topn` | The topn parameter | `None of int32 samples [0 1 10 42 100 1024 2048] satisfied rules map[VES.I/o.schema.rules.uint32.gte:1 VES.I/o.schema.rules.uint32.lte:100]` |

## Example Usage

Ask Claude to help you work with Suspicious User resources:

### Get Suspicious User Details

> "Get details of the suspicious-user named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suspicious_users" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suspicious_users/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suspicious_users" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @suspicious_user.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/suspicious_users/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
