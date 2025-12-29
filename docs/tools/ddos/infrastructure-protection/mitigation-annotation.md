---
page_title: f5xc_mitigation_annotation - f5xc-api-mcp
subcategory: Ddos
description: Event mitigation annotation.
---

# Mitigation Annotation

!!! info "Low Risk"
    Operations on this resource are generally safe.

Return mitigation annotations that occur while an event is active.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-ddos-mitigation-annotation-list` | Event mitigation annotation. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `event_id` | Event ID | `9ba097cf-35e3-4560-9c00-5a1a36b8f85b.` |
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Mitigation Annotation resources:

### List Mitigation Annotations

> "List all mitigation-annotations in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl infraprotect mitigation-annotation list --namespace {namespace}
```

List all mitigation-annotations

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl ddos create mitigation_annotation -n <namespace> -i mitigation_annotation.yaml

# Get
f5xcctl ddos get mitigation_annotation <name> -n <namespace>

# List
f5xcctl ddos list mitigation_annotation -n <namespace>

# Delete
f5xcctl ddos delete mitigation_annotation <name> -n <namespace>
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
