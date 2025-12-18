---
page_title: f5xc_justification - f5xc-api-mcp
subcategory: Organization
description: Update Script Justification
---

# Justification

Delete the specified script justification

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-justification-create` | Update Script Justification |
| `f5xc-api-core-justification-delete` | Delete Script Justification |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | namespace |
| `script_id` | script_id |
| `justification_id` | justification_id |

## Example Usage

Ask Claude to help you work with Justification resources:

### Create Justification

> "Create a justification named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f justification.yaml

# Get
f5xcctl get justification {name} -n {namespace}

# List
f5xcctl get justifications -n {namespace}

# Delete
f5xcctl delete justification {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_justification" "example" {
  name      = "example-justification"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
