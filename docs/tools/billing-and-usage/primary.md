---
page_title: f5xc_primary - f5xc-api-mcp
subcategory: Billing And Usage
description: Make credit card primary.
---

# Primary

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Flags a payment method as primary. Nothing changes is the payment method is already primary, if the
payment method is secondary then it becomes default and there will be no secondary.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-primary-create` | Make credit card primary. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Payment-method-1.` |
| `namespace` | Namespace | `System` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- primary

## Example Usage

Ask Claude to help you work with Primary resources:

### Create Primary

> "Create a primary named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl web primary create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl web primary create {name} --namespace {namespace}
```

Create primary

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create primary -n <namespace> -i primary.yaml

# Get
f5xcctl billing_and_usage get primary <name> -n <namespace>

# List
f5xcctl billing_and_usage list primary -n <namespace>

# Delete
f5xcctl billing_and_usage delete primary <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_primary" "example" {
  name      = "example-primary"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
