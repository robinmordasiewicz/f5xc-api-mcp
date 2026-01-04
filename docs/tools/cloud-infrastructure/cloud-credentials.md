---
page_title: f5xc_cloud_credentials - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Create Cloud Credentials.
---

# Cloud Credentials

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of cloud_credentials in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-cloud-credentials-create` | Create Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-get` | GET Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-list` | List Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-update` | Replace Cloud Credentials. |
| `f5xc-api-cloudinfrastructure-cloud-credentials-delete` | DELETE Cloud Credentials. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- cloud-credentials

**Modifies:**

- cloud-credentials

**Deletes:**

- cloud-credentials
- contained_resources

## Example Usage

Ask Claude to help you work with Cloud Credentials resources:

### Create Cloud Credentials

> "Create a cloud-credentials named 'example' in the 'production' namespace"

### List Cloud Credentialss

> "List all cloud-credentialss in the 'production' namespace"

### Get Cloud Credentials Details

> "Get details of the cloud-credentials named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_credentialss" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_credentialss/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_credentialss" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @cloud_credentials.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/cloud_credentialss/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
