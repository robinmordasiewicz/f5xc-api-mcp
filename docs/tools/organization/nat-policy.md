---
page_title: f5xc_nat_policy - f5xc-api-mcp
subcategory: Organization
description: Create NAT Policy
---

# Nat Policy

NAT Policy replaces specification condigures NAT Policy with multiple Rules,
corresponding Match
Criteria to apply on the packet content and Action to be
applied ifthe MatchCriteria matches

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-nat-policy-create` | Create NAT Policy |
| `f5xc-api-core-nat-policy-get` | Get NAT Policy |
| `f5xc-api-core-nat-policy-list` | List NAT Policy |
| `f5xc-api-core-nat-policy-update` | Replace NAT Policy |
| `f5xc-api-core-nat-policy-delete` | Delete NAT Policy |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Nat Policy resources:

### Create Nat Policy

> "Create a nat-policy named 'example' in the 'production' namespace"

### List Nat Policys

> "List all nat-policys in the 'production' namespace"

### Get Nat Policy Details

> "Get details of the nat-policy named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f nat_policy.yaml

# Get
f5xcctl get nat_policy {name} -n {namespace}

# List
f5xcctl get nat_policys -n {namespace}

# Delete
f5xcctl delete nat_policy {name} -n {namespace}
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
