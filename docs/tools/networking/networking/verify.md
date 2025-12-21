---
page_title: f5xc_verify - f5xc-api-mcp
subcategory: Networking
description: Verify DNS Domain.
---

# Verify

Verify DNS Domain for a given dns_domain object.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-verify-create` | Verify DNS Domain. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Verify resources:

### Create Verify

> "Create a verify named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create verify -n <namespace> -i verify.yaml

# Get
f5xcctl networking get verify <name> -n <namespace>

# List
f5xcctl networking list verify -n <namespace>

# Delete
f5xcctl networking delete verify <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_verify" "example" {
  name      = "example-verify"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
