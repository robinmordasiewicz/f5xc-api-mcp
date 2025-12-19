---
page_title: f5xc_bot_detection_update - f5xc-api-mcp
subcategory: Bot Defense
description: Get bot detection updates
---

# Bot Detection Update

Get bot detection updates

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-bot-detection-update-list` | Get bot detection updates |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Bot Detection Update resources:

### List Bot Detection Updates

> "List all bot-detection-updates in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f bot_detection_update.yaml

# Get
f5xcctl get bot_detection_update {name} -n {namespace}

# List
f5xcctl get bot_detection_updates -n {namespace}

# Delete
f5xcctl delete bot_detection_update {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_bot_detection_update" "example" {
  name      = "example-bot-detection-update"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
