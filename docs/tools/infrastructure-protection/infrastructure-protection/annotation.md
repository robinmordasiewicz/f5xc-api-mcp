---
page_title: f5xc_annotation - f5xc-api-mcp
subcategory: Infrastructure Protection
description: Mitigation annotations.
---

# Annotation

Returns annotations of a single mitigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructureprotection-annotation-list` | Mitigation annotations. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `mitigation_id` | Mitigation ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Annotation resources:

### List Annotations

> "List all annotations in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure_protection create annotation -n <namespace> -i annotation.yaml

# Get
f5xcctl infrastructure_protection get annotation <name> -n <namespace>

# List
f5xcctl infrastructure_protection list annotation -n <namespace>

# Delete
f5xcctl infrastructure_protection delete annotation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_annotation" "example" {
  name      = "example-annotation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
