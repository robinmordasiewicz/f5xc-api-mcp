---
page_title: f5xc_top_good_bot - f5xc-api-mcp
subcategory: Shape
description: Peer Group Top Good Bots.
---

# Top Good Bot

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Peer Group Top Good Bots.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-good-bot-create` | Peer Group Top Good Bots. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-good-bot

## Example Usage

Ask Claude to help you work with Top Good Bot resources:

### Create Top Good Bot

> "Create a top-good-bot named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_good_bots" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_good_bots/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_good_bots" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @top_good_bot.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/top_good_bots/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
