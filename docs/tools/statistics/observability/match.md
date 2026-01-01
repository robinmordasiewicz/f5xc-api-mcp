---
page_title: f5xc_match - f5xc-api-mcp
subcategory: Statistics
description: GET Alert Policy Match.
---

# Match

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Alert Policies that match to a set of alert labels for a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-match-create` | GET Alert Policy Match. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Ns1` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- match

## Example Usage

Ask Claude to help you work with Match resources:

### Create Match

> "Create a match named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh statistics create match -n <namespace> -i match.yaml

# Get
xcsh statistics get match <name> -n <namespace>

# List
xcsh statistics list match -n <namespace>

# Delete
xcsh statistics delete match <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_match" "example" {
  name      = "example-match"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
