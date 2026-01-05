---
page_title: f5xc_alert - f5xc-api-mcp
subcategory: Ddos
description: DDoS Alerts.
---

# Alert

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

RPC to GET a list of Alerts. Alerts are raised when an attack is detected by L3/L4 provider.
Alerts
help to start investigate and mitigate any malicious or suspicious activate.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-alert-create` | DDoS Alerts. |
| `f5xc-api-ddos-alert-list` | DDoS Alert. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `-` |
| `alert_id` | Alert ID | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- alert

## Example Usage

Ask Claude to help you work with Alert resources:

### Create Alert

> "Create a alert named 'example' in the 'production' namespace"

### List Alerts

> "List all alerts in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alerts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alerts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alerts" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @alert.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/alerts/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
