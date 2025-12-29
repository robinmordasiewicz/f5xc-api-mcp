---
page_title: f5xc_oas_validation - f5xc-api-mcp
subcategory: API
description: Suggest Open API specification validation rule.
---

# Oas Validation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Suggest Open API specification validation rule for a given path.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-oas-validation-create` | Suggest Open API specification validation rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- oas-validation

## Example Usage

Ask Claude to help you work with Oas Validation resources:

### Create Oas Validation

> "Create a oas-validation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config oas-validation create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config oas-validation create {name} --namespace {namespace}
```

Create oas-validation

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create oas_validation -n <namespace> -i oas_validation.yaml

# Get
f5xcctl api get oas_validation <name> -n <namespace>

# List
f5xcctl api list oas_validation -n <namespace>

# Delete
f5xcctl api delete oas_validation <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_oas_validation" "example" {
  name      = "example-oas-validation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
