---
page_title: f5xc_swap_primary - f5xc-api-mcp
subcategory: Billing And Usage
description: Make payment method secondary.
---

# Swap Primary

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Swaps payment method roles - the payment method used as a parameter will became primary, any other
will become secondary. The `name` parameter is ignored.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-swap-primary-create` | Make payment method secondary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Payment-method-1.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- swap-primary

## Example Usage

Ask Claude to help you work with Swap Primary resources:

### Create Swap Primary

> "Create a swap-primary named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web swap-primary create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web swap-primary create {name} --namespace {namespace}
```

Create swap-primary

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create swap_primary -n <namespace> -i swap_primary.yaml

# Get
f5xcctl billing_and_usage get swap_primary <name> -n <namespace>

# List
f5xcctl billing_and_usage list swap_primary -n <namespace>

# Delete
f5xcctl billing_and_usage delete swap_primary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_swap_primary" "example" {
  name      = "example-swap-primary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
