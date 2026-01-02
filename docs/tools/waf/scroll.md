---
page_title: f5xc_scroll - f5xc-api-mcp
subcategory: WAF
description: Security Event Scroll Query.
---

# Scroll

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

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
| `f5xc-api-waf-scroll-create` | Security Event Scroll Query. |
| `f5xc-api-waf-scroll-list` | Security Event Scroll Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `scroll_id` | Long Base-64 encoded string which can be used to retrieve next batch of security events. | `DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- scroll

## Example Usage

Ask Claude to help you work with Scroll resources:

### Create Scroll

> "Create a scroll named 'example' in the 'production' namespace"

### List Scrolls

> "List all scrolls in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh waf create scroll -n <namespace> -i scroll.yaml

# Get
xcsh waf get scroll <name> -n <namespace>

# List
xcsh waf list scroll -n <namespace>

# Delete
xcsh waf delete scroll <name> -n <namespace>
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
