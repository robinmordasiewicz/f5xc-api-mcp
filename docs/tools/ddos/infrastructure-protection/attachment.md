---
page_title: f5xc_attachment - f5xc-api-mcp
subcategory: Ddos
description: Event attachments.
---

# Attachment

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns any attachments associated with an event. This could be Pcap files or any other
document.
Obsolete - use `GetEvent` to list out attachments.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-attachment-list` | Event attachments. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `event_id` | Event ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Attachment resources:

### List Attachments

> "List all attachments in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl infraprotect attachment list --namespace {namespace}
```

List all attachments

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create attachment -n <namespace> -i attachment.yaml

# Get
f5xcctl ddos get attachment <name> -n <namespace>

# List
f5xcctl ddos list attachment -n <namespace>

# Delete
f5xcctl ddos delete attachment <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_attachment" "example" {
  name      = "example-attachment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
