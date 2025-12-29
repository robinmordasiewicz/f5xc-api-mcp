---
page_title: f5xc_annotation - f5xc-api-mcp
subcategory: Ddos
description: Mitigation annotations.
---

# Annotation

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns annotations of a single mitigation.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-annotation-list` | Mitigation annotations. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `mitigation_id` | Mitigation ID | `92d6e1e6-b6e9-46d4-9286-796a6b3fbf6a.` |
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Annotation resources:

### List Annotations

> "List all annotations in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl infraprotect annotation list --namespace {namespace}
```

List all annotations

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create annotation -n <namespace> -i annotation.yaml

# Get
f5xcctl ddos get annotation <name> -n <namespace>

# List
f5xcctl ddos list annotation -n <namespace>

# Delete
f5xcctl ddos delete annotation <name> -n <namespace>
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
