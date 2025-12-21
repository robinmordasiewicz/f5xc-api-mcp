---
page_title: f5xc_scroll - f5xc-api-mcp
subcategory: Security
description: Security Event Scroll Query.
---

# Scroll

Scroll request is used to fetch large number of security events in multiple batches with each
SecurityEventResponse
containing no more than 500 messages. To scroll through more than 500 or all
messages, one can use the
SecurityEventScrollRequest. Use the scroll_id returned in the
SecurityEventResponse to fetch the next batch of security events
and one can continue this process
till the scroll_id returned is "" which indicates no more events to scroll.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-scroll-create` | Security Event Scroll Query. |
| `f5xc-api-security-scroll-list` | Security Event Scroll Query. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `scroll_id` | Long Base-64 encoded string which can be used to retrieve next batch of security events. |

## Example Usage

Ask Claude to help you work with Scroll resources:

### Create Scroll

> "Create a scroll named 'example' in the 'production' namespace"

### List Scrolls

> "List all scrolls in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create scroll -n <namespace> -i scroll.yaml

# Get
f5xcctl security get scroll <name> -n <namespace>

# List
f5xcctl security list scroll -n <namespace>

# Delete
f5xcctl security delete scroll <name> -n <namespace>
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
