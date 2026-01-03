---
page_title: f5xc_scroll - f5xc-api-mcp
subcategory: Sites
description: Firewall Logs Scroll Query.
---

# Scroll

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

The response for firewall log query contain no more than 500 records.
Scroll request is used scroll
through more than 500 records or all records that matched the criteria in the
firewall log query in
multiple batches. EOF is indicated by empty scroll_id in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-scroll-create` | Firewall Logs Scroll Query. |
| `f5xc-api-sites-scroll-list` | Firewall Logs Scroll Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `scroll_id` | Long Base-64 encoded string which can be used to retrieve next batch of log messages. | `Vm9sdGVycmEgRWRnZSBQbGF0Zm9ybQ==.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- scroll

## Example Usage

Ask Claude to help you work with Scroll resources:

### Create Scroll

> "Create a scroll named 'example' in the 'production' namespace"

### List Scrolls

> "List all scrolls in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/scrolls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/scrolls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/scrolls" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @scroll.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/scrolls/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
