---
page_title: f5xc_timeserie - f5xc-api-mcp
subcategory: Organization
description: Malicious Report APP Time Series
---

# Timeserie

Malicious Report APP Time Series

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-timeserie-create` | Malicious Report APP Time Series |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Timeserie resources:

### Create Timeserie

> "Create a timeserie named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f timeserie.yaml

# Get
f5xcctl get timeserie {name} -n {namespace}

# List
f5xcctl get timeseries -n {namespace}

# Delete
f5xcctl delete timeserie {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_timeserie" "example" {
  name      = "example-timeserie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
