---
page_title: f5xc_discover_vpc - f5xc-api-mcp
subcategory: Cloud Infrastructure
description: Cloud Connect VPC Discovery.
---

# Discover VPC

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Returns all the vpcs for a specified cloud provider, region and cred.
For AWS it returns all the
vpcs which are not attached to any transit gateway in that region.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cloudinfrastructure-discover-vpc-create` | Cloud Connect VPC Discovery. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- discover-vpc

## Example Usage

Ask Claude to help you work with Discover VPC resources:

### Create Discover VPC

> "Create a discover-vpc named 'example' in the 'production' namespace"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discover_vpcs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discover_vpcs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discover_vpcs" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @discover_vpc.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/discover_vpcs/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
