---
page_title: f5xc_dc_cluster_group - f5xc-api-mcp
subcategory: Network
description: Create DC Cluster Group.
---

# Dc Cluster Group

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Replace given DC Cluster Group in given namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-dc-cluster-group-create` | Create DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-get` | GET DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-list` | List DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-update` | Replace DC Cluster Group. |
| `f5xc-api-network-dc-cluster-group-delete` | DELETE DC Cluster Group. |

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

- dc-cluster-group

**Modifies:**

- dc-cluster-group

**Deletes:**

- dc-cluster-group
- contained_resources

## Example Usage

Ask Claude to help you work with Dc Cluster Group resources:

### Create Dc Cluster Group

> "Create a dc-cluster-group named 'example' in the 'production' namespace"

### List Dc Cluster Groups

> "List all dc-cluster-groups in the 'production' namespace"

### Get Dc Cluster Group Details

> "Get details of the dc-cluster-group named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dc_cluster_groups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dc_cluster_groups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dc_cluster_groups" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @dc_cluster_group.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/dc_cluster_groups/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
