---
page_title: f5xc_threat_type - f5xc-api-mcp
subcategory: Shape
description: Peergroup By Threat Types.
---

# Threat Type

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GetThreat Types traffic count for Peergroup Benchmarking.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-threat-type-create` | Peergroup By Threat Types. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- threat-type

## Example Usage

Ask Claude to help you work with Threat Type resources:

### Create Threat Type

> "Create a threat-type named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create threat_type -n <namespace> -i threat_type.yaml

# Get
xcsh shape get threat_type <name> -n <namespace>

# List
xcsh shape list threat_type -n <namespace>

# Delete
xcsh shape delete threat_type <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_threat_type" "example" {
  name      = "example-threat-type"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
