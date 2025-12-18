---
page_title: f5xc_top_source - f5xc-api-mcp
subcategory: Organization
description: Post SAFE Top Sources
---

# Top Source

Post SAFE Analyst Station Dashboard Transaction Breakdown request

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-top-source-create` | Post SAFE Top Sources |
| `f5xc-api-core-top-source-list` | Get SAFE Top Sources |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `from` | The from parameter |
| `limit` | The limit parameter |
| `to` | The to parameter |
| `version` | The version parameter |

## Example Usage

Ask Claude to help you work with Top Source resources:

### Create Top Source

> "Create a top-source named 'example' in the 'production' namespace"

### List Top Sources

> "List all top-sources in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f top_source.yaml

# Get
f5xcctl get top_source {name} -n {namespace}

# List
f5xcctl get top_sources -n {namespace}

# Delete
f5xcctl delete top_source {name} -n {namespace}
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
