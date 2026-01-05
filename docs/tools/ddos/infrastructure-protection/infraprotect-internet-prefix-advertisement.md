---
page_title: f5xc_infraprotect_internet_prefix_advertisement - f5xc-api-mcp
subcategory: Ddos
description: Create DDoS transit Internet Prefix.
---

# Infraprotect Internet Prefix Advertisement

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of infraprotect_internet_prefix_advertisement in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-create` | Create DDoS transit Internet Prefix. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-get` | GET Infraprotect Internet Prefix. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-list` | List Infraprotect Internet Prefix Advertisement. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-update` | Replace DDoS transit Internet Prefix. |
| `f5xc-api-ddos-infraprotect-internet-prefix-advertisement-delete` | DELETE Infraprotect Internet Prefix Advertisement. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `-` |
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |
| `metadata.name` | Name | `-` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `-` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- infraprotect-internet-prefix-advertisement

**Modifies:**

- infraprotect-internet-prefix-advertisement

**Deletes:**

- infraprotect-internet-prefix-advertisement
- contained_resources

## Example Usage

Ask Claude to help you work with Infraprotect Internet Prefix Advertisement resources:

### Create Infraprotect Internet Prefix Advertisement

> "Create a infraprotect-internet-prefix-advertisement named 'example' in the 'production' namespace"

### List Infraprotect Internet Prefix Advertisements

> "List all infraprotect-internet-prefix-advertisements in the 'production' namespace"

### Get Infraprotect Internet Prefix Advertisement Details

> "Get details of the infraprotect-internet-prefix-advertisement named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_internet_prefix_advertisements" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_internet_prefix_advertisements/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_internet_prefix_advertisements" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @infraprotect_internet_prefix_advertisement.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/infraprotect_internet_prefix_advertisements/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
