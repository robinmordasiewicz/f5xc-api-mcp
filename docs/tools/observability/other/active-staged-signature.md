---
page_title: f5xc_active_staged_signature - f5xc-api-mcp
subcategory: Observability
description: Active Staged Signatures.
---

# Active Staged Signature

API to GET active Staged Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-active-staged-signature-list` | Active Staged Signatures. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `vh_name` | Vh_name |

## Example Usage

Ask Claude to help you work with Active Staged Signature resources:

### List Active Staged Signatures

> "List all active-staged-signatures in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create active_staged_signature -n <namespace> -i active_staged_signature.yaml

# Get
f5xcctl configuration get active_staged_signature -n <namespace> <name>

# List
f5xcctl configuration list active_staged_signature -n <namespace>

# Delete
f5xcctl configuration delete active_staged_signature -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_active_staged_signature" "example" {
  name      = "example-active-staged-signature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
