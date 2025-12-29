---
page_title: f5xc_simplified_route - f5xc-api-mcp
subcategory: Network
description: Show Simplified Routes.
---

# Simplified Route

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Show user-friendly VER routes matching the request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-simplified-route-create` | Show Simplified Routes. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |
| `site` | Site Name | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- simplified-route

## Example Usage

Ask Claude to help you work with Simplified Route resources:

### Create Simplified Route

> "Create a simplified-route named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl operate simplified-route create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl operate simplified-route create {name} --namespace {namespace}
```

Create simplified-route

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create simplified_route -n <namespace> -i simplified_route.yaml

# Get
f5xcctl network get simplified_route <name> -n <namespace>

# List
f5xcctl network list simplified_route -n <namespace>

# Delete
f5xcctl network delete simplified_route <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_simplified_route" "example" {
  name      = "example-simplified-route"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
