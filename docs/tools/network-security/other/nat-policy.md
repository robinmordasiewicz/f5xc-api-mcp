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

## xcsh Equivalent

```bash
# Create/Update
xcsh network_security create nat_policy -n <namespace> -i nat_policy.yaml

# Get
xcsh network_security get nat_policy <name> -n <namespace>

# List
xcsh network_security list nat_policy -n <namespace>

# Delete
xcsh network_security delete nat_policy <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_nat_policy" "example" {
  name      = "example-nat-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
