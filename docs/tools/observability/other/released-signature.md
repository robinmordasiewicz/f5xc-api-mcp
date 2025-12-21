---
page_title: f5xc_released_signature - f5xc-api-mcp
subcategory: Observability
description: Released Signatures.
---

# Released Signature

API to GET Released Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-released-signature-list` | Released Signatures. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `vh_name` | Vh_name |

## Example Usage

Ask Claude to help you work with Released Signature resources:

### List Released Signatures

> "List all released-signatures in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create released_signature -n <namespace> -i released_signature.yaml

# Get
f5xcctl observability get released_signature <name> -n <namespace>

# List
f5xcctl observability list released_signature -n <namespace>

# Delete
f5xcctl observability delete released_signature <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_released_signature" "example" {
  name      = "example-released-signature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
