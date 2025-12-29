---
page_title: f5xc_evaluate - f5xc-api-mcp
subcategory: API
description: Evaluate API Group.
---

# Evaluate

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Evaluate API Group Builder against all API endpoints associated with the referenced object and
return the resulting API Group.
For example, if the referenced object is an HTTP LB then all
discovered and imported endpoints are associated with it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-evaluate-create` | Evaluate API Group. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- evaluate

## Example Usage

Ask Claude to help you work with Evaluate resources:

### Create Evaluate

> "Create a evaluate named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl ml evaluate create {name} --namespace {namespace}
```

Create evaluate

### file_based

```bash
f5xcctl ml evaluate create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create evaluate -n <namespace> -i evaluate.yaml

# Get
f5xcctl api get evaluate <name> -n <namespace>

# List
f5xcctl api list evaluate -n <namespace>

# Delete
f5xcctl api delete evaluate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_evaluate" "example" {
  name      = "example-evaluate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
