---
page_title: f5xc_plan - f5xc-api-mcp
subcategory: Organization
description: Get Plan
---

# Plan

Get plan reads a given object from storage backend for metadata.namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-plan-get` | Get Plan |
| `f5xc-api-core-plan-list` | List Plan |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Plan resources:

### List Plans

> "List all plans in the 'production' namespace"

### Get Plan Details

> "Get details of the plan named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f plan.yaml

# Get
f5xcctl get plan {name} -n {namespace}

# List
f5xcctl get plans -n {namespace}

# Delete
f5xcctl delete plan {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_plan" "example" {
  name      = "example-plan"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
