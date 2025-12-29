---
page_title: f5xc_usage - f5xc-api-mcp
subcategory: Billing And Usage
description: GET Quota Usage.
---

# Usage

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET allows users to query limits and current usage of resources.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-billingandusage-usage-list` | GET Quota Usage. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |

## Example Usage

Ask Claude to help you work with Usage resources:

### List Usages

> "List all usages in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl web usage list --namespace {namespace}
```

List all usages

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl billing_and_usage create usage -n <namespace> -i usage.yaml

# Get
f5xcctl billing_and_usage get usage <name> -n <namespace>

# List
f5xcctl billing_and_usage list usage -n <namespace>

# Delete
f5xcctl billing_and_usage delete usage <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_usage" "example" {
  name      = "example-usage"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
