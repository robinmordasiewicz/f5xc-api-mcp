---
page_title: f5xc_released_signature - f5xc-api-mcp
subcategory: WAF
description: Released Signatures.
---

# Released Signature

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET Released Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-released-signature-list` | Released Signatures. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |
| `vh_name` | Vh_name | `Blogging-app.` |

## Example Usage

Ask Claude to help you work with Released Signature resources:

### List Released Signatures

> "List all released-signatures in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl config released-signature list --namespace {namespace}
```

List all released-signatures

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create released_signature -n <namespace> -i released_signature.yaml

# Get
f5xcctl waf get released_signature <name> -n <namespace>

# List
f5xcctl waf list released_signature -n <namespace>

# Delete
f5xcctl waf delete released_signature <name> -n <namespace>
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
