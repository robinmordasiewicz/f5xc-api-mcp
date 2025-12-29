---
page_title: f5xc_transactions_over_time - f5xc-api-mcp
subcategory: Shape
description: PostSafeTransactionsOverTime.
---

# Transactions Over Time

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

POST Safe Analyst Station Dashboard Transaction Breakdown request.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-transactions-over-time-create` | PostSafeTransactionsOverTime. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- transactions-over-time

## Example Usage

Ask Claude to help you work with Transactions Over Time resources:

### Create Transactions Over Time

> "Create a transactions-over-time named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape transactions-over-time create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape transactions-over-time create {name} --namespace {namespace}
```

Create transactions-over-time

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create transactions_over_time -n <namespace> -i transactions_over_time.yaml

# Get
f5xcctl shape get transactions_over_time <name> -n <namespace>

# List
f5xcctl shape list transactions_over_time -n <namespace>

# Delete
f5xcctl shape delete transactions_over_time <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_transactions_over_time" "example" {
  name      = "example-transactions-over-time"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
