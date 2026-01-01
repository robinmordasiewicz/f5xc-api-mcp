---
page_title: f5xc_scroll - f5xc-api-mcp
subcategory: Blindfold
description: Audit Log Scroll Query.
---

# Scroll

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

The response for audit log query contain no more than 500 messages.
One can use scroll request to
scroll through more than 500 messages or all messages
in multiple batches. Empty scroll_id in the
response indicates no more messages to fetch (EOF).

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-scroll-create` | Audit Log Scroll Query. |
| `f5xc-api-blindfold-scroll-list` | Audit Log Scroll Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `scroll_id` | Long Base-64 encoded string which can be used to retrieve next batch of log messages. | `Vm9sdGVycmEgRWRnZSBQbGF0Zm9ybQ==.` |

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
xcsh blindfold create scroll -n <namespace> -i scroll.yaml

# Get
xcsh blindfold get scroll <name> -n <namespace>

# List
xcsh blindfold list scroll -n <namespace>

# Delete
xcsh blindfold delete scroll <name> -n <namespace>
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
