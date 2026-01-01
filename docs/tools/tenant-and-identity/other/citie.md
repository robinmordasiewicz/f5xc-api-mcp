---
page_title: f5xc_citie - f5xc-api-mcp
subcategory: Tenant And Identity
description: List cities.
---

# Citie

!!! info "Low Risk"
    Operations on this resource are generally safe.

Returns a list of known cities of a country/state.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-citie-list` | List cities. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `country_code` | Country code | `US` |
| `prefix` | Prefix | `DE` |
| `state_code` | State code | `TN` |

## Example Usage

Ask Claude to help you work with Citie resources:

### List Cities

> "List all cities in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh tenant_and_identity create citie -n <namespace> -i citie.yaml

# Get
xcsh tenant_and_identity get citie <name> -n <namespace>

# List
xcsh tenant_and_identity list citie -n <namespace>

# Delete
xcsh tenant_and_identity delete citie <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_citie" "example" {
  name      = "example-citie"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
