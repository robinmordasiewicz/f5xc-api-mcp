---
page_title: f5xc_aggregation - f5xc-api-mcp
subcategory: WAF
description: Security Events Aggregation Query All Namespaces.
---

# Aggregation

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

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
| `f5xc-api-waf-aggregation-create` | Security Events Aggregation Query All Namespaces. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- aggregation

## Example Usage

Ask Claude to help you work with Aggregation resources:

### Create Aggregation

> "Create a aggregation named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl data aggregation create {name} --namespace {namespace}
```

Create aggregation

### file_based

```bash
f5xcctl data aggregation create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl waf create aggregation -n <namespace> -i aggregation.yaml

# Get
f5xcctl waf get aggregation <name> -n <namespace>

# List
f5xcctl waf list aggregation -n <namespace>

# Delete
f5xcctl waf delete aggregation <name> -n <namespace>
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
