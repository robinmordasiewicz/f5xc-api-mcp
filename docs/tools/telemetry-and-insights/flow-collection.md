---
page_title: f5xc_flow_collection - f5xc-api-mcp
subcategory: Telemetry And Insights
description: Flow Collection.
---

# Flow Collection

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET flow collection from the flow records.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-telemetryandinsights-flow-collection-create` | Flow Collection. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- flow-collection

## Example Usage

Ask Claude to help you work with Flow Collection resources:

### Create Flow Collection

> "Create a flow-collection named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data flow-collection create {name} --namespace {namespace}
```

Create flow-collection

### file_based

```bash
f5xcctl data flow-collection create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl telemetry_and_insights create flow_collection -n <namespace> -i flow_collection.yaml

# Get
f5xcctl telemetry_and_insights get flow_collection <name> -n <namespace>

# List
f5xcctl telemetry_and_insights list flow_collection -n <namespace>

# Delete
f5xcctl telemetry_and_insights delete flow_collection <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_flow_collection" "example" {
  name      = "example-flow-collection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
