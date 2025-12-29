---
page_title: f5xc_subscribe - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Subscribe to Flow Collection.
---

# Subscribe

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Subscribe to Flow Collection.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-subscribe-create` | Subscribe to Flow Collection. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- subscribe

## Example Usage

Ask Claude to help you work with Subscribe resources:

### Create Subscribe

> "Create a subscribe named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config subscribe create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config subscribe create {name} --namespace {namespace}
```

Create subscribe

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create subscribe -n <namespace> -i subscribe.yaml

# Get
f5xcctl telemetry_and_insights get subscribe <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list subscribe -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete subscribe <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subscribe" "example" {
  name      = "example-subscribe"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
