---
page_title: f5xc_top_talker - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Top Talkers.
---

# Top Talker

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET top talkers from the flow records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-top-talker-create` | Top Talkers. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-talker

## Example Usage

Ask Claude to help you work with Top Talker resources:

### Create Top Talker

> "Create a top-talker named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create top_talker -n <namespace> -i top_talker.yaml

# Get
xcsh telemetry_and_insights get top_talker <name> -n <namespace>

# List
xcsh telemetry_and_insights list top_talker -n <namespace>

# Delete
xcsh telemetry_and_insights delete top_talker <name> -n <namespace>
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
