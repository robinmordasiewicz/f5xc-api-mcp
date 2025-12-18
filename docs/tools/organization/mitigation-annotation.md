---
page_title: f5xc_mitigation_annotation - f5xc-api-mcp
subcategory: Organization
description: Event mitigation annotation
---

# Mitigation Annotation

Return mitigation annotations that occur while an event is active

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-mitigation-annotation-list` | Event mitigation annotation |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `event_id` | Event ID |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Mitigation Annotation resources:

### List Mitigation Annotations

> "List all mitigation-annotations in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f mitigation_annotation.yaml

# Get
f5xcctl get mitigation_annotation {name} -n {namespace}

# List
f5xcctl get mitigation_annotations -n {namespace}

# Delete
f5xcctl delete mitigation_annotation {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_mitigation_annotation" "example" {
  name      = "example-mitigation-annotation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
