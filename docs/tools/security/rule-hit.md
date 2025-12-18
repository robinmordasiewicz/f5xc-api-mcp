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
f5xcctl apply -f rule_hit.yaml

# Get
f5xcctl get rule_hit {name} -n {namespace}

# List
f5xcctl get rule_hits -n {namespace}

# Delete
f5xcctl delete rule_hit {name} -n {namespace}
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
