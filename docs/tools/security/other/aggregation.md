---
page_title: f5xc_aggregation - f5xc-api-mcp
subcategory: Security
description: Security Events Aggregation Query All Namespaces.
---

# Aggregation

GET summary/aggregation data for security events in the given namespace.
For `system` namespace, all
security events for the tenant matching the query specified
in the request will be considered for
aggregation. User may query security events that matches various
fields such as `vh_name`,
`sec_event_type`, `src_site`, `city`, `country`.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-aggregation-create` | Security Events Aggregation Query All Namespaces. |

## Example Usage

Ask Claude to help you work with Aggregation resources:

### Create Aggregation

> "Create a aggregation named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create aggregation -n <namespace> -i aggregation.yaml

# Get
f5xcctl configuration get aggregation -n <namespace> <name>

# List
f5xcctl configuration list aggregation -n <namespace>

# Delete
f5xcctl configuration delete aggregation -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_aggregation" "example" {
  name      = "example-aggregation"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
