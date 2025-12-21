---
page_title: f5xc_top_talker - f5xc-api-mcp
subcategory: Observability
description: Top Talkers.
---

# Top Talker

Request to GET top talkers from the flow records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-top-talker-create` | Top Talkers. |

## Example Usage

Ask Claude to help you work with Top Talker resources:

### Create Top Talker

> "Create a top-talker named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create top_talker -n <namespace> -i top_talker.yaml

# Get
f5xcctl observability get top_talker <name> -n <namespace>

# List
f5xcctl observability list top_talker -n <namespace>

# Delete
f5xcctl observability delete top_talker <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_top_talker" "example" {
  name      = "example-top-talker"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
