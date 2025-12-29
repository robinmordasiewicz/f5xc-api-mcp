---
page_title: f5xc_rule_hit - f5xc-api-mcp
subcategory: WAF
description: Client Rule Hits Metrics.
---

# Rule Hit

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

GET number of rule hits per client for a given namespace.
The rule hits counter can be aggregated
based on one or more labels listed here.
NAMESPACE, APP_TYPE, VIRTUAL_HOST, SITE, SERVICE, INSTANCE,
WAF_INSTANCE_ID, RULE_ID, RULE_SEVERITY, RULE_TAG.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-waf-rule-hit-create` | Client Rule Hits Metrics. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Bloggin-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rule-hit

## Example Usage

Ask Claude to help you work with Rule Hit resources:

### Create Rule Hit

> "Create a rule-hit named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl data rule-hit create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl data rule-hit create {name} --namespace {namespace}
```

Create rule-hit

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create rule_hit -n <namespace> -i rule_hit.yaml

# Get
f5xcctl waf get rule_hit <name> -n <namespace>

# List
f5xcctl waf list rule_hit -n <namespace>

# Delete
f5xcctl waf delete rule_hit <name> -n <namespace>
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
