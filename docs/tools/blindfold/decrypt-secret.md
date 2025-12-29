---
page_title: f5xc_decrypt_secret - f5xc-api-mcp
subcategory: Blindfold
description: DecryptSecret.
---

# Decrypt Secret

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DecryptSecret API takes blinded encrypted secret and policy and responds with blinded decrypted
secret if user is allowed by the policy.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-blindfold-decrypt-secret-create` | DecryptSecret. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- decrypt-secret

## Example Usage

Ask Claude to help you work with Decrypt Secret resources:

### Create Decrypt Secret

> "Create a decrypt-secret named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl secret_management decrypt-secret create {name} --namespace {namespace}
```

Create decrypt-secret

### file_based

```bash
f5xcctl secret_management decrypt-secret create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl blindfold create decrypt_secret -n <namespace> -i decrypt_secret.yaml

# Get
f5xcctl blindfold get decrypt_secret <name> -n <namespace>

# List
f5xcctl blindfold list decrypt_secret -n <namespace>

# Delete
f5xcctl blindfold delete decrypt_secret <name> -n <namespace>
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
