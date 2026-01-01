---
page_title: f5xc_policie - f5xc-api-mcp
subcategory: Shape
description: Deploy Policies to Bot Infra.
---

# Policie

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Deploy Policies to Bot Infrastructure.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-policie-create` | Deploy Policies to Bot Infra. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Bot Infra Name | `Cluster_1` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- policie

## Example Usage

Ask Claude to help you work with Policie resources:

### Create Policie

> "Create a policie named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create policie -n <namespace> -i policie.yaml

# Get
xcsh shape get policie <name> -n <namespace>

# List
xcsh shape list policie -n <namespace>

# Delete
xcsh shape delete policie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_policie" "example" {
  name      = "example-policie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
