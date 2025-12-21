---
page_title: f5xc_gettoken - f5xc-api-mcp
subcategory: AI Intelligence
description: Subscribe to BFDP pipeline.
---

# Gettoken

Subscribe to BFDP pipeline.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-aiintelligence-gettoken-create` | Subscribe to BFDP pipeline. |

## Example Usage

Ask Claude to help you work with Gettoken resources:

### Create Gettoken

> "Create a gettoken named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ai_intelligence create gettoken -n <namespace> -i gettoken.yaml

# Get
f5xcctl ai_intelligence get gettoken <name> -n <namespace>

# List
f5xcctl ai_intelligence list gettoken -n <namespace>

# Delete
f5xcctl ai_intelligence delete gettoken <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_gettoken" "example" {
  name      = "example-gettoken"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
