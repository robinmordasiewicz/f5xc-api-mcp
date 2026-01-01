---
page_title: f5xc_top_good_bot - f5xc-api-mcp
subcategory: Shape
description: Peer Group Top Good Bots.
---

# Top Good Bot

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Peer Group Top Good Bots.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-top-good-bot-create` | Peer Group Top Good Bots. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- top-good-bot

## Example Usage

Ask Claude to help you work with Top Good Bot resources:

### Create Top Good Bot

> "Create a top-good-bot named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create top_good_bot -n <namespace> -i top_good_bot.yaml

# Get
xcsh shape get top_good_bot <name> -n <namespace>

# List
xcsh shape list top_good_bot -n <namespace>

# Delete
xcsh shape delete top_good_bot <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_top_good_bot" "example" {
  name      = "example-top-good-bot"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
