---
page_title: f5xc_dataSet - f5xc-api-mcp
subcategory: Data Intelligence
description: GET Data Sets.
---

# DataSet

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET the list of data sets eligible for the tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-dataset-list` | GET Data Sets. |

## Example Usage

Ask Claude to help you work with DataSet resources:

### List DataSets

> "List all dataSets in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data-intelligence dataSet list --namespace {namespace}
```

List all dataSets

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl data_intelligence create dataSet -n <namespace> -i dataSet.yaml

# Get
f5xcctl data_intelligence get dataSet <name> -n <namespace>

# List
f5xcctl data_intelligence list dataSet -n <namespace>

# Delete
f5xcctl data_intelligence delete dataSet <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_dataSet" "example" {
  name      = "example-dataSet"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
