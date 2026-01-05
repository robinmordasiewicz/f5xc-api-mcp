---
page_title: f5xc_container_registry - f5xc-api-mcp
subcategory: Managed Kubernetes
description: Create Container Registry.
---

# Container Registry

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

List the set of container_registry in a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-managedkubernetes-container-registry-create` | Create Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-get` | GET Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-list` | List Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-update` | Replace Container Registry. |
| `f5xc-api-managedkubernetes-container-registry-delete` | DELETE Container Registry. |

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

- container-registry

**Modifies:**

- container-registry

**Deletes:**

- container-registry
- contained_resources

## Example Usage

Ask Claude to help you work with Container Registry resources:

### Create Container Registry

> "Create a container-registry named 'example' in the 'production' namespace"

### List Container Registrys

> "List all container-registrys in the 'production' namespace"

### Get Container Registry Details

> "Get details of the container-registry named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/container_registrys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/container_registrys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/container_registrys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @container_registry.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/container_registrys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
