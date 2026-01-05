---
page_title: f5xc_set_vpc_k8s_hostname - f5xc-api-mcp
subcategory: Sites
description: Configure VPC K8s hostnames.
---

# Set VPC K8S Hostname

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Configure VPC K8s node hostname set.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-set-vpc-k8s-hostname-create` | Configure VPC K8s hostnames. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `-` |
| `namespace` | Namespace | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- set-vpc-k8s-hostname

## Example Usage

Ask Claude to help you work with Set VPC K8S Hostname resources:

### Create Set VPC K8S Hostname

> "Create a set-vpc-k8s-hostname named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpc_k8s_hostnames" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpc_k8s_hostnames/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpc_k8s_hostnames" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @set_vpc_k8s_hostname.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/set_vpc_k8s_hostnames/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
