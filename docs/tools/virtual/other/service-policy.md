---
page_title: f5xc_service_policy - f5xc-api-mcp
subcategory: Virtual
description: Create Service Policy.
---

# Service Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace service_policy replaces an existing object in the storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-virtual-service-policy-create` | Create Service Policy. |
| `f5xc-api-virtual-service-policy-get` | GET Service Policy. |
| `f5xc-api-virtual-service-policy-list` | List Service Policy. |
| `f5xc-api-virtual-service-policy-update` | Replace Service Policy. |
| `f5xc-api-virtual-service-policy-delete` | DELETE Service Policy. |

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

- service-policy

**Modifies:**

- service-policy

**Deletes:**

- service-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Service Policy resources:

### Create Service Policy

> "Create a service-policy named 'example' in the 'production' namespace"

### List Service Policys

> "List all service-policys in the 'production' namespace"

### Get Service Policy Details

> "Get details of the service-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @service_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/service_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
