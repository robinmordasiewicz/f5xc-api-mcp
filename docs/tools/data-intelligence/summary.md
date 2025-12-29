---
page_title: f5xc_summary - f5xc-api-mcp
subcategory: Data Intelligence
description: Load Executive Summary.
---

# Summary

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Executive summary page for DI premium customers.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-dataintelligence-summary-create` | Load Executive Summary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Foobar` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- summary

## Example Usage

Ask Claude to help you work with Summary resources:

### Create Summary

> "Create a summary named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data-intelligence summary create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data-intelligence summary create {name} --namespace {namespace}
```

Create summary

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl data_intelligence create summary -n <namespace> -i summary.yaml

# Get
f5xcctl data_intelligence get summary <name> -n <namespace>

# List
f5xcctl data_intelligence list summary -n <namespace>

# Delete
f5xcctl data_intelligence delete summary <name> -n <namespace>
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
