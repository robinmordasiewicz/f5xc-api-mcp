---
page_title: f5xc_credential_stuffing_attack - f5xc-api-mcp
subcategory: Shape
description: "Insight Event: Credential Stuffing Attack."
---

# Credential Stuffing Attack

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Insight Credential Stuffing Attack.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-credential-stuffing-attack-create` | Insight Event: Credential Stuffing Attack. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Default` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- credential-stuffing-attack

## Example Usage

Ask Claude to help you work with Credential Stuffing Attack resources:

### Create Credential Stuffing Attack

> "Create a credential-stuffing-attack named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create credential_stuffing_attack -n <namespace> -i credential_stuffing_attack.yaml

# Get
xcsh shape get credential_stuffing_attack <name> -n <namespace>

# List
xcsh shape list credential_stuffing_attack -n <namespace>

# Delete
xcsh shape delete credential_stuffing_attack <name> -n <namespace>
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
