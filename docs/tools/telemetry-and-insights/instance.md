---
page_title: f5xc_instance - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Service Instance Query.
---

# Instance

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET time-series data for a service instance.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-instance-create` | Service Instance Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- instance

## Example Usage

Ask Claude to help you work with Instance resources:

### Create Instance

> "Create a instance named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create instance -n <namespace> -i instance.yaml

# Get
xcsh telemetry_and_insights get instance <name> -n <namespace>

# List
xcsh telemetry_and_insights list instance -n <namespace>

# Delete
xcsh telemetry_and_insights delete instance <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_instance" "example" {
  name      = "example-instance"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
