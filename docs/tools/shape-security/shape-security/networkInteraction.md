---
page_title: f5xc_networkInteraction - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: List Network Interactions By Script.
---

# NetworkInteraction

List all the network interactions for a script depending on start time and end time.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-networkinteraction-get` | List Network Interactions By Script. |

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

## Example Usage

Ask Claude to help you work with NetworkInteraction resources:

### Get NetworkInteraction Details

> "Get details of the networkInteraction named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create networkInteraction -n <namespace> -i networkInteraction.yaml

# Get
f5xcctl configuration get networkInteraction -n <namespace> <name>

# List
f5xcctl configuration list networkInteraction -n <namespace>

# Delete
f5xcctl configuration delete networkInteraction -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_networkInteraction" "example" {
  name      = "example-networkInteraction"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
