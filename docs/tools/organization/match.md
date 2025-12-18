---
page_title: f5xc_match - f5xc-api-mcp
subcategory: Organization
description: Get Alert Policy Match
---

# Match

Get Alert Policies that match to a set of alert labels for a namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-match-create` | Get Alert Policy Match |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |

## Example Usage

Ask Claude to help you work with Match resources:

### Create Match

> "Create a match named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f match.yaml

# Get
f5xcctl get match {name} -n {namespace}

# List
f5xcctl get matchs -n {namespace}

# Delete
f5xcctl delete match {name} -n {namespace}
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
