---
page_title: f5xc_test - f5xc-api-mcp
subcategory: Statistics
description: Test Alert Receiver.
---

# Test

API to send test alert.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-test-create` | Test Alert Receiver. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Example Usage

Ask Claude to help you work with Test resources:

### Create Test

> "Create a test named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tests" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tests/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tests" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @test.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/tests/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
