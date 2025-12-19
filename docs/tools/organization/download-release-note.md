---
page_title: f5xc_download_release_note - f5xc-api-mcp
subcategory: Organization
description: Download BotDetection Updates Release Notes
---

# Download Release Note

Download BotDetection Updates Release Notes

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-download-release-note-list` | Download BotDetection Updates Release Notes |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `deployment_id` | The deployment_id parameter |

## Example Usage

Ask Claude to help you work with Download Release Note resources:

### List Download Release Notes

> "List all download-release-notes in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create download_release_note -n <namespace> -i download_release_note.yaml

# Get
f5xcctl configuration get download_release_note -n <namespace> <name>

# List
f5xcctl configuration list download_release_note -n <namespace>

# Delete
f5xcctl configuration delete download_release_note -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_download_release_note" "example" {
  name      = "example-download-release-note"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
