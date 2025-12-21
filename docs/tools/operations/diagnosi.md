---
page_title: f5xc_diagnosi - f5xc-api-mcp
subcategory: Operations
description: Diagnosis
---

# Diagnosi

GET VPM network information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-operations-diagnosi-list` | Diagnosis |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `console_user` | Name of the console user who runs this command. |

## Example Usage

Ask Claude to help you work with Diagnosi resources:

### List Diagnosis

> "List all diagnosis in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl operations create diagnosi -n <namespace> -i diagnosi.yaml

# Get
f5xcctl operations get diagnosi <name> -n <namespace>

# List
f5xcctl operations list diagnosi -n <namespace>

# Delete
f5xcctl operations delete diagnosi <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_diagnosi" "example" {
  name      = "example-diagnosi"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
