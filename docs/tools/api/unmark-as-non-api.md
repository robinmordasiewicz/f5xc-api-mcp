---
page_title: f5xc_unmark_as_non_api - f5xc-api-mcp
subcategory: API
description: Unmark As Non-API.
---

# Unmark As Non API

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

DELETE the provided API endpoints from the API Definition's non-API list.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-unmark-as-non-api-create` | Unmark As Non-API. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- unmark-as-non-api

## Example Usage

Ask Claude to help you work with Unmark As Non API resources:

### Create Unmark As Non API

> "Create a unmark-as-non-api named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config unmark-as-non-api create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config unmark-as-non-api create {name} --namespace {namespace}
```

Create unmark-as-non-api

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create unmark_as_non_api -n <namespace> -i unmark_as_non_api.yaml

# Get
f5xcctl api get unmark_as_non_api <name> -n <namespace>

# List
f5xcctl api list unmark_as_non_api -n <namespace>

# Delete
f5xcctl api delete unmark_as_non_api <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_unmark_as_non_api" "example" {
  name      = "example-unmark-as-non-api"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
