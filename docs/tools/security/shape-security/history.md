---
page_title: f5xc_history - f5xc-api-mcp
subcategory: Security
description: GET the change history for a bot detection rule.
---

# History

Getbotdetectionrulechangehistory CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-history-get` | GET the change history for a bot detection rule. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with History resources:

### Get History Details

> "Get details of the history named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create history -n <namespace> -i history.yaml

# Get
f5xcctl security get history <name> -n <namespace>

# List
f5xcctl security list history -n <namespace>

# Delete
f5xcctl security delete history <name> -n <namespace>
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
