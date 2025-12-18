---
page_title: f5xc_threat_type - f5xc-api-mcp
subcategory: Organization
description: Peergroup By Threat Types
---

# Threat Type

GetThreat Types traffic count for Peergroup Benchmarking

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-threat-type-create` | Peergroup By Threat Types |

## Example Usage

Ask Claude to help you work with Threat Type resources:

### Create Threat Type

> "Create a threat-type named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f threat_type.yaml

# Get
f5xcctl get threat_type {name} -n {namespace}

# List
f5xcctl get threat_types -n {namespace}

# Delete
f5xcctl delete threat_type {name} -n {namespace}
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
