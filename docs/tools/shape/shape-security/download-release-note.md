---
page_title: f5xc_download_release_note - f5xc-api-mcp
subcategory: Shape
description: Download BotDetection Updates Release Notes.
---

# Download Release Note

!!! info "Low Risk"
    Operations on this resource are generally safe.

Downloadbotdetectionupdatesreleasenotes CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-download-release-note-list` | Download BotDetection Updates Release Notes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `deployment_id` | X-required | `06957ed8-52b5-43e0-bb56-429db281bfb4.` |

## Example Usage

Ask Claude to help you work with Download Release Note resources:

### List Download Release Notes

> "List all download-release-notes in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl shape download-release-note list --namespace {namespace}
```

List all download-release-notes

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create download_release_note -n <namespace> -i download_release_note.yaml

# Get
f5xcctl shape get download_release_note <name> -n <namespace>

# List
f5xcctl shape list download_release_note -n <namespace>

# Delete
f5xcctl shape delete download_release_note <name> -n <namespace>
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
