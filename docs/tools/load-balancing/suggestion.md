---
page_title: f5xc_suggestion - f5xc-api-mcp
subcategory: Load Balancing
description: Suggest API endpoint protection rule
---

# Suggestion

Suggest API endpoint protection rule for a given path
DEPRECATED. use
api_sec.rule_suggestion.RuleSuggestionAPI.GetSuggestedAPIEndpointProtectionRule

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waap-suggestion-create` | Suggest API endpoint protection rule |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Suggestion resources:

### Create Suggestion

> "Create a suggestion named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f suggestion.yaml

# Get
f5xcctl get suggestion {name} -n {namespace}

# List
f5xcctl get suggestions -n {namespace}

# Delete
f5xcctl delete suggestion {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_suggestion" "example" {
  name      = "example-suggestion"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
