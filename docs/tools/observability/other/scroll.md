---
page_title: f5xc_scroll - f5xc-api-mcp
subcategory: Observability
description: Access Log Scroll Query.
---

# Scroll

The response for access log query contain no more than 500 records.
Scroll request is used scroll
through more than 500 records or all records that matched the criteria in the
access log query in
multiple batches. EOF is indicated by empty scroll_id in the response.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-scroll-create` | Access Log Scroll Query. |
| `f5xc-api-observability-scroll-list` | Access Log Scroll Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `scroll_id` | Long Base-64 encoded string which can be used to retrieve next batch of log messages. |

## Example Usage

Ask Claude to help you work with Scroll resources:

### Create Scroll

> "Create a scroll named 'example' in the 'production' namespace"

### List Scrolls

> "List all scrolls in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create scroll -n <namespace> -i scroll.yaml

# Get
f5xcctl observability get scroll <name> -n <namespace>

# List
f5xcctl observability list scroll -n <namespace>

# Delete
f5xcctl observability delete scroll <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_scroll" "example" {
  name      = "example-scroll"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
