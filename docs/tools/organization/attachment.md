---
page_title: f5xc_attachment - f5xc-api-mcp
subcategory: Organization
description: Event attachments
---

# Attachment

Returns any attachments associated with an event. This could be Pcap files or any other
document.
Obsolete - use `GetEvent` to list out attachments

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-attachment-list` | Event attachments |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `event_id` | Event ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Attachment resources:

### List Attachments

> "List all attachments in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f attachment.yaml

# Get
f5xcctl get attachment {name} -n {namespace}

# List
f5xcctl get attachments -n {namespace}

# Delete
f5xcctl delete attachment {name} -n {namespace}
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
