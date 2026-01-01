---
page_title: f5xc_top_source - f5xc-api-mcp
subcategory: Shape
description: POST SAFE Top Sources.
---

# Top Source

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST SAFE Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-source-create` | POST SAFE Top Sources. |
| `f5xc-api-shape-top-source-list` | GET SAFE Top Sources. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `from` | Timestamp representing start date of the requested period in millieseconds. | `1638320400000.` |
| `limit` | Limited number of records. | `3` |
| `to` | Timestamp representing end date of the requested period in millieseconds. | `1638320400000.` |
| `version` | The API version to use. | `V3` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-source

## Example Usage

Ask Claude to help you work with Top Source resources:

### Create Top Source

> "Create a top-source named 'example' in the 'production' namespace"

### List Top Sources

> "List all top-sources in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create top_source -n <namespace> -i top_source.yaml

# Get
xcsh shape get top_source <name> -n <namespace>

# List
xcsh shape list top_source -n <namespace>

# Delete
xcsh shape delete top_source <name> -n <namespace>
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
