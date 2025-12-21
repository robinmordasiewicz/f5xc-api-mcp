---
page_title: f5xc_list_policy - f5xc-api-mcp
subcategory: Security
description: List secret policy.
---

# List Policy

Listpolicy CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-list-policy-list` | List secret policy. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `policy_state` | Policy_state |

## Example Usage

Ask Claude to help you work with List Policy resources:

### List List Policys

> "List all list-policys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create list_policy -n <namespace> -i list_policy.yaml

# Get
f5xcctl security get list_policy <name> -n <namespace>

# List
f5xcctl security list list_policy -n <namespace>

# Delete
f5xcctl security delete list_policy <name> -n <namespace>
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
