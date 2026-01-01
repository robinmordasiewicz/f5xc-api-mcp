---
page_title: f5xc_bot_detection_update - f5xc-api-mcp
subcategory: Shape
description: GET bot detection updates.
---

# Bot Detection Update

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getbotdetectionupdates CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-bot-detection-update-list` | GET bot detection updates. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

## Example Usage

Ask Claude to help you work with Bot Detection Update resources:

### List Bot Detection Updates

> "List all bot-detection-updates in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create bot_detection_update -n <namespace> -i bot_detection_update.yaml

# Get
xcsh shape get bot_detection_update <name> -n <namespace>

# List
xcsh shape list bot_detection_update -n <namespace>

# Delete
xcsh shape delete bot_detection_update <name> -n <namespace>
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
