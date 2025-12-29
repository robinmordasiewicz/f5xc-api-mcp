---
page_title: f5xc_transaction - f5xc-api-mcp
subcategory: Shape
description: GET Bot Assessment for Transactions.
---

# Transaction

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET Bot Transactions Information.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transaction-create` | GET Bot Assessment for Transactions. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transaction

## Example Usage

Ask Claude to help you work with Transaction resources:

### Create Transaction

> "Create a transaction named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape transaction create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape transaction create {name} --namespace {namespace}
```

Create transaction

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create transaction -n <namespace> -i transaction.yaml

# Get
f5xcctl shape get transaction <name> -n <namespace>

# List
f5xcctl shape list transaction -n <namespace>

# Delete
f5xcctl shape delete transaction <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transaction" "example" {
  name      = "example-transaction"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
