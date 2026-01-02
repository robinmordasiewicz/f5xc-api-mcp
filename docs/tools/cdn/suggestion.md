---
page_title: f5xc_suggestion - f5xc-api-mcp
subcategory: CDN
description: Suggest block client rule.
---

# Suggestion

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Suggest blocking SimpleClientSrcRule for a given IP/ASN.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-cdn-suggestion-create` | Suggest block client rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `VES-I/O-frontend.` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- suggestion

## Example Usage

Ask Claude to help you work with Suggestion resources:

### Create Suggestion

> "Create a suggestion named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh cdn create suggestion -n <namespace> -i suggestion.yaml

# Get
xcsh cdn get suggestion <name> -n <namespace>

# List
xcsh cdn list suggestion -n <namespace>

# Delete
xcsh cdn delete suggestion <name> -n <namespace>
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
