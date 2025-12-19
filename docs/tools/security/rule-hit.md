---
page_title: f5xc_rule_hit - f5xc-api-mcp
subcategory: Security
description: Client Rule Hits Metrics
---

# Rule Hit

Get number of rule hits per client for a given namespace.
The rule hits counter can be aggregated
based on one or more labels listed here.
NAMESPACE, APP_TYPE, VIRTUAL_HOST, SITE, SERVICE, INSTANCE,
WAF_INSTANCE_ID, RULE_ID, RULE_SEVERITY, RULE_TAG.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-rule-hit-create` | Client Rule Hits Metrics |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Rule Hit resources:

### Create Rule Hit

> "Create a rule-hit named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create rule_hit -n <namespace> -i rule_hit.yaml

# Get
f5xcctl configuration get rule_hit -n <namespace> <name>

# List
f5xcctl configuration list rule_hit -n <namespace>

# Delete
f5xcctl configuration delete rule_hit -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_rule_hit" "example" {
  name      = "example-rule-hit"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
