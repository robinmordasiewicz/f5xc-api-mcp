---
page_title: f5xc_mark_as_non_api - f5xc-api-mcp
subcategory: API
description: Mark As Non-API.
---

# Mark As Non API

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the API Definition's non-API list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-mark-as-non-api-create` | Mark As Non-API. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- mark-as-non-api

## Example Usage

Ask Claude to help you work with Mark As Non API resources:

### Create Mark As Non API

> "Create a mark-as-non-api named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config mark-as-non-api create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config mark-as-non-api create {name} --namespace {namespace}
```

Create mark-as-non-api

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create mark_as_non_api -n <namespace> -i mark_as_non_api.yaml

# Get
f5xcctl api get mark_as_non_api <name> -n <namespace>

# List
f5xcctl api list mark_as_non_api -n <namespace>

# Delete
f5xcctl api delete mark_as_non_api <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_mark_as_non_api" "example" {
  name      = "example-mark-as-non-api"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
