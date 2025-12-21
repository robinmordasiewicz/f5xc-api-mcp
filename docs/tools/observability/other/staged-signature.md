---
page_title: f5xc_staged_signature - f5xc-api-mcp
subcategory: Observability
description: Staged Signatures.
---

# Staged Signature

API to GET Staged Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-staged-signature-create` | Staged Signatures. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `vh_name` | Vh_name |

## Example Usage

Ask Claude to help you work with Staged Signature resources:

### Create Staged Signature

> "Create a staged-signature named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl observability create staged_signature -n <namespace> -i staged_signature.yaml

# Get
f5xcctl observability get staged_signature <name> -n <namespace>

# List
f5xcctl observability list staged_signature -n <namespace>

# Delete
f5xcctl observability delete staged_signature <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_staged_signature" "example" {
  name      = "example-staged-signature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
