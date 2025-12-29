---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Shape
description: Endpoint Summary.
---

# Summary

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Getbotdetectionrulessummary CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-summary-create` | Endpoint Summary. |
| `f5xc-api-shape-summary-list` | GET summary of bot detection rules. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- summary

## Example Usage

Ask Claude to help you work with Summary resources:

### Create Summary

> "Create a summary named 'example' in the 'production' namespace"

### List Summarys

> "List all summarys in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape summary create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape summary create {name} --namespace {namespace}
```

Create summary

### list_all

```bash
f5xcctl shape summary list --namespace {namespace}
```

List all summarys

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create summary -n <namespace> -i summary.yaml

# Get
f5xcctl shape get summary <name> -n <namespace>

# List
f5xcctl shape list summary -n <namespace>

# Delete
f5xcctl shape delete summary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_summary" "example" {
  name      = "example-summary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
