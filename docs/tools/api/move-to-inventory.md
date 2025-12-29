---
page_title: f5xc_move_to_inventory - f5xc-api-mcp
subcategory: API
description: Move To API Inventory.
---

# Move To Inventory

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Update the API Definition's include list with the provided API endpoints.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-move-to-inventory-create` | Move To API Inventory. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- move-to-inventory

## Example Usage

Ask Claude to help you work with Move To Inventory resources:

### Create Move To Inventory

> "Create a move-to-inventory named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config move-to-inventory create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config move-to-inventory create {name} --namespace {namespace}
```

Create move-to-inventory

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api create move_to_inventory -n <namespace> -i move_to_inventory.yaml

# Get
f5xcctl api get move_to_inventory <name> -n <namespace>

# List
f5xcctl api list move_to_inventory -n <namespace>

# Delete
f5xcctl api delete move_to_inventory <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_move_to_inventory" "example" {
  name      = "example-move-to-inventory"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
