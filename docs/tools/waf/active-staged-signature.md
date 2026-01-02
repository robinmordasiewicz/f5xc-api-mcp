---
page_title: f5xc_active_staged_signature - f5xc-api-mcp
subcategory: WAF
description: Active Staged Signatures.
---

# Active Staged Signature

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET active Staged Signatures.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-active-staged-signature-list` | Active Staged Signatures. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |
| `vh_name` | Vh_name | `Blogging-app.` |

## Example Usage

Ask Claude to help you work with Active Staged Signature resources:

### List Active Staged Signatures

> "List all active-staged-signatures in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh waf create active_staged_signature -n <namespace> -i active_staged_signature.yaml

# Get
xcsh waf get active_staged_signature <name> -n <namespace>

# List
xcsh waf list active_staged_signature -n <namespace>

# Delete
xcsh waf delete active_staged_signature <name> -n <namespace>
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
