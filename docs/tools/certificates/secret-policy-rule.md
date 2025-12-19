---
page_title: f5xc_secret_policy_rule - f5xc-api-mcp
subcategory: Certificates
description: Create Secret Policy Rule
---

# Secret Policy Rule

Replace secret_policy_rule creates a new object in storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-secret-policy-rule-create` | Create Secret Policy Rule |
| `f5xc-api-core-secret-policy-rule-get` | Get Secret Policy Rule |
| `f5xc-api-core-secret-policy-rule-list` | List Secret Policy Rule |
| `f5xc-api-core-secret-policy-rule-update` | Replace Secret Policy Rule |
| `f5xc-api-core-secret-policy-rule-delete` | Delete Secret Policy Rule |

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

Ask Claude to help you work with Secret Policy Rule resources:

### Create Secret Policy Rule

> "Create a secret-policy-rule named 'example' in the 'production' namespace"

### List Secret Policy Rules

> "List all secret-policy-rules in the 'production' namespace"

### Get Secret Policy Rule Details

> "Get details of the secret-policy-rule named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create secret_policy_rule -n <namespace> -i secret_policy_rule.yaml

# Get
f5xcctl configuration get secret_policy_rule -n <namespace> <name>

# List
f5xcctl configuration list secret_policy_rule -n <namespace>

# Delete
f5xcctl configuration delete secret_policy_rule -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_secret_policy_rule" "example" {
  name      = "example-secret-policy-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
