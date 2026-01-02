---
page_title: f5xc_history - f5xc-api-mcp
subcategory: Shape
description: GET the change history for a bot detection rule.
---

# History

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getbotdetectionrulechangehistory CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-history-get` | GET the change history for a bot detection rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `Rule_CB_DUBEXLDQKV.` |
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with History resources:

### Get History Details

> "Get details of the history named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create history -n <namespace> -i history.yaml

# Get
xcsh shape get history <name> -n <namespace>

# List
xcsh shape list history -n <namespace>

# Delete
xcsh shape delete history <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_history" "example" {
  name      = "example-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
