---
page_title: f5xc_top_source - f5xc-api-mcp
subcategory: Shape Security (Bot Defense)
description: POST SAFE Top Sources.
---

# Top Source

POST SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shapesecurity-top-source-create` | POST SAFE Top Sources. |
| `f5xc-api-shapesecurity-top-source-list` | GET SAFE Top Sources. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `from` | Timestamp representing start date of the requested period in millieseconds. |
| `limit` | Limited number of records. |
| `to` | Timestamp representing end date of the requested period in millieseconds. |
| `version` | The API version to use. |

## Example Usage

Ask Claude to help you work with Top Source resources:

### Create Top Source

> "Create a top-source named 'example' in the 'production' namespace"

### List Top Sources

> "List all top-sources in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create top_source -n <namespace> -i top_source.yaml

# Get
f5xcctl configuration get top_source -n <namespace> <name>

# List
f5xcctl configuration list top_source -n <namespace>

# Delete
f5xcctl configuration delete top_source -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_top_source" "example" {
  name      = "example-top-source"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
