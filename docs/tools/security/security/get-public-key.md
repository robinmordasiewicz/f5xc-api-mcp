---
page_title: f5xc_get_public_key - f5xc-api-mcp
subcategory: Security
description: Public Key.
---

# Get Public Key

GetPublicKey API returns public part of the F5 Distributed Cloud secret management key that needs to
be given to F5 Distributed Cloud secret management tool to do secret encryption.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-get-public-key-list` | Public Key. |

## Parameters

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `key_version` | The version of public key. |

## Example Usage

Ask Claude to help you work with Get Public Key resources:

### List Get Public Keys

> "List all get-public-keys in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create get_public_key -n <namespace> -i get_public_key.yaml

# Get
f5xcctl security get get_public_key <name> -n <namespace>

# List
f5xcctl security list get_public_key -n <namespace>

# Delete
f5xcctl security delete get_public_key <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_get_public_key" "example" {
  name      = "example-get-public-key"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
