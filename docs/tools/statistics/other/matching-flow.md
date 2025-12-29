---
page_title: f5xc_matching_flow - f5xc-api-mcp
subcategory: Statistics
description: Show Matching Flows.
---

# Matching Flow

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Show VER flows matching the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-matching-flow-create` | Show Matching Flows. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- matching-flow

## Example Usage

Ask Claude to help you work with Matching Flow resources:

### Create Matching Flow

> "Create a matching-flow named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate matching-flow create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate matching-flow create {name} --namespace {namespace}
```

Create matching-flow

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create matching_flow -n <namespace> -i matching_flow.yaml

# Get
f5xcctl statistics get matching_flow <name> -n <namespace>

# List
f5xcctl statistics list matching_flow -n <namespace>

# Delete
f5xcctl statistics delete matching_flow <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_matching_flow" "example" {
  name      = "example-matching-flow"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
