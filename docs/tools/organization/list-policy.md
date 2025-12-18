---
page_title: f5xc_list_policy - f5xc-api-mcp
subcategory: Organization
description: List secret policy
---

# List Policy

List secret policy

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-list-policy-list` | List secret policy |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `policy_state` | policy_state |

## Example Usage

Ask Claude to help you work with List Policy resources:

### List List Policys

> "List all list-policys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f list_policy.yaml

# Get
f5xcctl get list_policy {name} -n {namespace}

# List
f5xcctl get list_policys -n {namespace}

# Delete
f5xcctl delete list_policy {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_list_policy" "example" {
  name      = "example-list-policy"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
