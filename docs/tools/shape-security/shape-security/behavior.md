---
page_title: f5xc_behavior - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: List Behaviors By Script.
---

# Behavior

List all the behaviors for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-behavior-get` | List Behaviors By Script. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `id` | ID |
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `end_time` | X-required |
| `start_time` | X-required |
| `type` | X-required |

## Example Usage

Ask Claude to help you work with Behavior resources:

### Get Behavior Details

> "Get details of the behavior named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape_security create behavior -n <namespace> -i behavior.yaml

# Get
f5xcctl shape_security get behavior <name> -n <namespace>

# List
f5xcctl shape_security list behavior -n <namespace>

# Delete
f5xcctl shape_security delete behavior <name> -n <namespace>
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
