---
page_title: f5xc_dos_automitigation_rule - f5xc-api-mcp
subcategory: CDN
description: DELETE DoS Auto-Mitigation Rule for CDN Load Balancer.
---

# Dos Automitigation Rule

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

DELETE the corresponding DoS Auto-Mitigation Rule for the given CDN load balancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-dos-automitigation-rule-get` | GET DoS Auto-Mitigation Rules for CDN Load Balancer. |
| `f5xc-api-cdn-dos-automitigation-rule-delete` | DELETE DoS Auto-Mitigation Rule for CDN Load Balancer. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `dos_automitigation_rule_name` | DoS Mitigation Rule Name | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Deletes:**

- dos-automitigation-rule
- contained_resources

## Example Usage

Ask Claude to help you work with Dos Automitigation Rule resources:

### Get Dos Automitigation Rule Details

> "Get details of the dos-automitigation-rule named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dos_automitigation_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dos_automitigation_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dos_automitigation_rules" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dos_automitigation_rule.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dos_automitigation_rules/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
