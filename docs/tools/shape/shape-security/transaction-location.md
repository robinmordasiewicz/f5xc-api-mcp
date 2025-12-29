---
page_title: f5xc_transaction_location - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionLocations.
---

# Transaction Location

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station specific transaction locations.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-location-create` | PostSafeTransactionLocations. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction-location

## Example Usage

Ask Claude to help you work with Transaction Location resources:

### Create Transaction Location

> "Create a transaction-location named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape transaction-location create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape transaction-location create {name} --namespace {namespace}
```

Create transaction-location

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create transaction_location -n <namespace> -i transaction_location.yaml

# Get
f5xcctl shape get transaction_location <name> -n <namespace>

# List
f5xcctl shape list transaction_location -n <namespace>

# Delete
f5xcctl shape delete transaction_location <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transaction_location" "example" {
  name      = "example-transaction-location"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
