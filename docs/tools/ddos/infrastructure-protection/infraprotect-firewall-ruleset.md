---
page_title: f5xc_infraprotect_firewall_ruleset - f5xc-api-mcp
subcategory: Ddos
description: GET Infraprotect Firewall Ruleset.
---

# Infraprotect Firewall Ruleset

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

List the set of infraprotect_firewall_ruleset in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-firewall-ruleset-get` | GET Infraprotect Firewall Ruleset. |
| `f5xc-api-ddos-infraprotect-firewall-ruleset-list` | List Infraprotect Firewall Ruleset. |
| `f5xc-api-ddos-infraprotect-firewall-ruleset-update` | Replace DDoS transit Firewall Ruleset. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |
| `metadata.namespace` | Namespace | `Staging` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- infraprotect-firewall-ruleset

## Example Usage

Ask Claude to help you work with Infraprotect Firewall Ruleset resources:

### List Infraprotect Firewall Rulesets

> "List all infraprotect-firewall-rulesets in the 'production' namespace"

### Get Infraprotect Firewall Ruleset Details

> "Get details of the infraprotect-firewall-ruleset named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_firewall_rulesets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_firewall_rulesets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_firewall_rulesets" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @infraprotect_firewall_ruleset.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_firewall_rulesets/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
