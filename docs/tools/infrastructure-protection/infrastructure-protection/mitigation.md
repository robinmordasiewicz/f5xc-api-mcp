---
page_title: f5xc_mitigation - f5xc-api-mcp
subcategory: Infrastructure Protection
description: List of mitigations.
---

# Mitigation

Returns details of a single mitigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-mitigation-create` | List of mitigations. |
| `f5xc-api-infrastructureprotection-mitigation-list` | Mitigation details. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |
| `mitigation_id` | Mitigation ID |

## Example Usage

Ask Claude to help you work with Mitigation resources:

### Create Mitigation

> "Create a mitigation named 'example' in the 'production' namespace"

### List Mitigations

> "List all mitigations in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create mitigation -n <namespace> -i mitigation.yaml

# Get
f5xcctl configuration get mitigation -n <namespace> <name>

# List
f5xcctl configuration list mitigation -n <namespace>

# Delete
f5xcctl configuration delete mitigation -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_mitigation" "example" {
  name      = "example-mitigation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
