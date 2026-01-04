---
page_title: f5xc_log - f5xc-api-mcp
subcategory: Sites
description: External connector log query.
---

# Log

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET external connector logs that matches the criteria in request for a given
namespace.
The logs are per site per external connector is specified as match condition in the
request to GET the logs for a external connector.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-log-create` | External connector log query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `external_connector` | External connector | `Connector-1.` |
| `namespace` | Namespace | `Value` |
| `site` | Site | `CE-1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- log

## Example Usage

Ask Claude to help you work with Log resources:

### Create Log

> "Create a log named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @log.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/logs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
