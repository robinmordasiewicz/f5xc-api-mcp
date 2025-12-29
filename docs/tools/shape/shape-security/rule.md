---
page_title: f5xc_rule - f5xc-api-mcp
subcategory: Shape
description: PostSafeBlockRule.
---

# Rule

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Edit exising block rule.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-rule-create` | PostSafeBlockRule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Payment-app-namespace-1.` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- rule

## Example Usage

Ask Claude to help you work with Rule resources:

### Create Rule

> "Create a rule named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl shape rule create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl shape rule create {name} --namespace {namespace}
```

Create rule

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create rule -n <namespace> -i rule.yaml

# Get
f5xcctl shape get rule <name> -n <namespace>

# List
f5xcctl shape list rule -n <namespace>

# Delete
f5xcctl shape delete rule <name> -n <namespace>
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
