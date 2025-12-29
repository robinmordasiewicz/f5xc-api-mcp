---
page_title: f5xc_enable_feature - f5xc-api-mcp
subcategory: Generative AI
description: Enable feature.
---

# Enable Feature

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Enable service by returning service account details.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-generativeai-enable-feature-create` | Enable feature. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- enable-feature

## Example Usage

Ask Claude to help you work with Enable Feature resources:

### Create Enable Feature

> "Create a enable-feature named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl ai_data enable-feature create {name} --namespace {namespace}
```

Create enable-feature

### file_based

```bash
f5xcctl ai_data enable-feature create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl generative_ai create enable_feature -n <namespace> -i enable_feature.yaml

# Get
f5xcctl generative_ai get enable_feature <name> -n <namespace>

# List
f5xcctl generative_ai list enable_feature -n <namespace>

# Delete
f5xcctl generative_ai delete enable_feature <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_enable_feature" "example" {
  name      = "example-enable-feature"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
