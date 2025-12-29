---
page_title: f5xc_data_exposure - f5xc-api-mcp
subcategory: API
description: Suggest sensitive data rule.
---

# Data Exposure

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Suggest sensitive data rule for a given path.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-data-exposure-create` | Suggest sensitive data rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- data-exposure

## Example Usage

Ask Claude to help you work with Data Exposure resources:

### Create Data Exposure

> "Create a data-exposure named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config data-exposure create {name} --namespace {namespace}
```

Create data-exposure

### file_based

```bash
f5xcctl config data-exposure create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create data_exposure -n <namespace> -i data_exposure.yaml

# Get
f5xcctl api get data_exposure <name> -n <namespace>

# List
f5xcctl api list data_exposure -n <namespace>

# Delete
f5xcctl api delete data_exposure <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_data_exposure" "example" {
  name      = "example-data-exposure"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
