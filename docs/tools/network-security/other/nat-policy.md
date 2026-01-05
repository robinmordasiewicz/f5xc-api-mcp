---
page_title: f5xc_nat_policy - f5xc-api-mcp
subcategory: Network Security
description: Create NAT Policy.
---

# Nat Policy

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

NAT Policy replaces specification condigures NAT Policy with multiple Rules,
corresponding Match
Criteria to apply on the packet content and Action to be
applied ifthe MatchCriteria matches.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networksecurity-nat-policy-create` | Create NAT Policy. |
| `f5xc-api-networksecurity-nat-policy-get` | GET NAT Policy. |
| `f5xc-api-networksecurity-nat-policy-list` | List NAT Policy. |
| `f5xc-api-networksecurity-nat-policy-update` | Replace NAT Policy. |
| `f5xc-api-networksecurity-nat-policy-delete` | DELETE NAT Policy. |

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

- nat-policy

**Modifies:**

- nat-policy

**Deletes:**

- nat-policy
- contained_resources

## Example Usage

Ask Claude to help you work with Nat Policy resources:

### Create Nat Policy

> "Create a nat-policy named 'example' in the 'production' namespace"

### List Nat Policys

> "List all nat-policys in the 'production' namespace"

### Get Nat Policy Details

> "Get details of the nat-policy named 'example' in namespace 'production'"

## CURL Examples

```bash
# List resources
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nat_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Get specific resource
curl -X GET "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nat_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json"

# Create resource
curl -X POST "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nat_policys" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d @nat_policy.json

# Delete resource
curl -X DELETE "https://${TENANT}.console.ves.volterra.io/api/config/namespaces/${NAMESPACE}/nat_policys/<name>" \
  -H "Authorization: APIToken ${F5XC_API_TOKEN}"
```
