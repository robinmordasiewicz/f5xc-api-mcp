---
page_title: f5xc_behavior - f5xc-api-mcp
subcategory: Organization
description: List Behaviors By Script
---

# Behavior

List all the behaviors for a script depending on start time and end time

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-behavior-get` | List Behaviors By Script |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | id |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | The end_time parameter |
| `start_time` | The start_time parameter |
| `type` | The type parameter |

## Example Usage

Ask Claude to help you work with Behavior resources:

### Get Behavior Details

> "Get details of the behavior named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f behavior.yaml

# Get
f5xcctl get behavior {name} -n {namespace}

# List
f5xcctl get behaviors -n {namespace}

# Delete
f5xcctl delete behavior {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_behavior" "example" {
  name      = "example-behavior"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
