---
page_title: f5xc_credential_stuffing_attack - f5xc-api-mcp
subcategory: Observability
description: "Insight Event: Credential Stuffing Attack."
---

# Credential Stuffing Attack

GET Insight Credential Stuffing Attack.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-observability-credential-stuffing-attack-create` | Insight Event: Credential Stuffing Attack. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Credential Stuffing Attack resources:

### Create Credential Stuffing Attack

> "Create a credential-stuffing-attack named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create credential_stuffing_attack -n <namespace> -i credential_stuffing_attack.yaml

# Get
f5xcctl configuration get credential_stuffing_attack -n <namespace> <name>

# List
f5xcctl configuration list credential_stuffing_attack -n <namespace>

# Delete
f5xcctl configuration delete credential_stuffing_attack -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_credential_stuffing_attack" "example" {
  name      = "example-credential-stuffing-attack"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
