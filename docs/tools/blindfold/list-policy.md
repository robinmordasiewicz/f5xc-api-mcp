---
page_title: f5xc_list_policy - f5xc-api-mcp
subcategory: Blindfold
description: List secret policy.
---

# List Policy

!!! info "Low Risk"
    Operations on this resource are generally safe.

Listpolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-list-policy-list` | List secret policy. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `policy_state` | Policy_state | `All` |

## Example Usage

Ask Claude to help you work with List Policy resources:

### List List Policys

> "List all list-policys in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh blindfold create list_policy -n <namespace> -i list_policy.yaml

# Get
xcsh blindfold get list_policy <name> -n <namespace>

# List
xcsh blindfold list list_policy -n <namespace>

# Delete
xcsh blindfold delete list_policy <name> -n <namespace>
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
