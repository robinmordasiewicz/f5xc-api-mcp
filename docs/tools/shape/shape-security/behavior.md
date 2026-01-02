---
page_title: f5xc_behavior - f5xc-api-mcp
subcategory: Shape
description: List Behaviors By Script.
---

# Behavior

!!! info "Low Risk"
    Operations on this resource are generally safe.

List all the behaviors for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-behavior-get` | List Behaviors By Script. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `id` | ID | `S-1234567` |
| `namespace` | Namespace | `Default` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `end_time` | X-required | `1570194300.` |
| `start_time` | X-required | `1570194000.` |
| `type` | X-required | `NEW` |

## Example Usage

Ask Claude to help you work with Behavior resources:

### Get Behavior Details

> "Get details of the behavior named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create behavior -n <namespace> -i behavior.yaml

# Get
xcsh shape get behavior <name> -n <namespace>

# List
xcsh shape list behavior -n <namespace>

# Delete
xcsh shape delete behavior <name> -n <namespace>
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
