---
page_title: f5xc_sid_counter - f5xc-api-mcp
subcategory: Organization
description: SID Counters
---

# Sid Counter

API to get SID Counters

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-sid-counter-create` | SID Counters |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Sid Counter resources:

### Create Sid Counter

> "Create a sid-counter named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create sid_counter -n <namespace> -i sid_counter.yaml

# Get
f5xcctl configuration get sid_counter -n <namespace> <name>

# List
f5xcctl configuration list sid_counter -n <namespace>

# Delete
f5xcctl configuration delete sid_counter -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_sid_counter" "example" {
  name      = "example-sid-counter"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
