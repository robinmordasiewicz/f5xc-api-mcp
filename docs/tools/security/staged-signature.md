---
page_title: f5xc_staged_signature - f5xc-api-mcp
subcategory: Security
description: Staged Signatures
---

# Staged Signature

API to get Staged Signatures

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-staged-signature-create` | Staged Signatures |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `vh_name` | vh_name |

## Example Usage

Ask Claude to help you work with Staged Signature resources:

### Create Staged Signature

> "Create a staged-signature named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f staged_signature.yaml

# Get
f5xcctl get staged_signature {name} -n {namespace}

# List
f5xcctl get staged_signatures -n {namespace}

# Delete
f5xcctl delete staged_signature {name} -n {namespace}
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
