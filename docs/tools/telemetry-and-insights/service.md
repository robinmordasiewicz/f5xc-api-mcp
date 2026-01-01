---
page_title: f5xc_service - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Service Graph Query.
---

# Service

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET monitoring data for a service mesh of a given application.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-service-create` | Service Graph Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- service

## Example Usage

Ask Claude to help you work with Service resources:

### Create Service

> "Create a service named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh telemetry_and_insights create service -n <namespace> -i service.yaml

# Get
xcsh telemetry_and_insights get service <name> -n <namespace>

# List
xcsh telemetry_and_insights list service -n <namespace>

# Delete
xcsh telemetry_and_insights delete service <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_service" "example" {
  name      = "example-service"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
