---
page_title: f5xc_decrypt_secret - f5xc-api-mcp
subcategory: Certificates
description: DecryptSecret
---

# Decrypt Secret

DecryptSecret API takes blinded encrypted secret and policy and responds with blinded decrypted
secret if user is allowed by the policy

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-decrypt-secret-create` | DecryptSecret |

## Example Usage

Ask Claude to help you work with Decrypt Secret resources:

### Create Decrypt Secret

> "Create a decrypt-secret named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f decrypt_secret.yaml

# Get
f5xcctl get decrypt_secret {name} -n {namespace}

# List
f5xcctl get decrypt_secrets -n {namespace}

# Delete
f5xcctl delete decrypt_secret {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_decrypt_secret" "example" {
  name      = "example-decrypt-secret"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
