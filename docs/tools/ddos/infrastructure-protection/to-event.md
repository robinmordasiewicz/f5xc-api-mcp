---
page_title: f5xc_to_event - f5xc-api-mcp
subcategory: Ddos
description: Link Alert to Event.
---

# To Event

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Allows customers to link alerts with events. This helps with tracking of any mitigation activity and
event investigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-to-event-update` | Link Alert to Event. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `alert_id` | Alert ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |
| `namespace` | Namespace | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Modifies:**

- to-event

## Example Usage

Ask Claude to help you work with To Event resources:

## CLI Examples

Examples from the enriched OpenAPI specifications:

### update

```bash
f5xcctl infraprotect to-event update {name} --namespace {namespace} -f {file}.yaml
```

Update to-event

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create to_event -n <namespace> -i to_event.yaml

# Get
f5xcctl ddos get to_event <name> -n <namespace>

# List
f5xcctl ddos list to_event -n <namespace>

# Delete
f5xcctl ddos delete to_event <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_to_event" "example" {
  name      = "example-to-event"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
