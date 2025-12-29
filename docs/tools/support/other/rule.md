---
page_title: f5xc_rule - f5xc-api-mcp
subcategory: Support
description: List USB Enablement Rules.
---

# Rule

!!! info "Low Risk"
    Operations on this resource are generally safe.

List USB Enablement Rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-support-rule-list` | List USB Enablement Rules. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `node` | Node Name | `Master-0` |
| `site` | Site Name | `Value` |

## Example Usage

Ask Claude to help you work with Rule resources:

### List Rules

> "List all rules in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl operate rule list --namespace {namespace}
```

List all rules

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl support create rule -n <namespace> -i rule.yaml

# Get
f5xcctl support get rule <name> -n <namespace>

# List
f5xcctl support list rule -n <namespace>

# Delete
f5xcctl support delete rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_rule" "example" {
  name      = "example-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
