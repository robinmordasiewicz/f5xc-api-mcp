---
page_title: f5xc_connectivity - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Connectivity Graph Query.
---

# Connectivity

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET Connectivity data between the sites.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-connectivity-create` | Connectivity Graph Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- connectivity

## Example Usage

Ask Claude to help you work with Connectivity resources:

### Create Connectivity

> "Create a connectivity named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data connectivity create {name} --namespace {namespace}
```

Create connectivity

### file_based

```bash
f5xcctl data connectivity create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create connectivity -n <namespace> -i connectivity.yaml

# Get
f5xcctl telemetry_and_insights get connectivity <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list connectivity -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete connectivity <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_connectivity" "example" {
  name      = "example-connectivity"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
