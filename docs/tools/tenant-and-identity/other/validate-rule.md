---
page_title: f5xc_validate_rule - f5xc-api-mcp
subcategory: Tenant And Identity
description: Validate Rules.
---

# Validate Rule

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

ValidateRules returns whether the value is valid or not for the specified validator rules.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-validate-rule-create` | Validate Rules. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- validate-rule

## Example Usage

Ask Claude to help you work with Validate Rule resources:

### Create Validate Rule

> "Create a validate-rule named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### file_based

```bash
f5xcctl config validate-rule create -f {file}.yaml
```

Create from YAML file

### basic_create

```bash
f5xcctl config validate-rule create {name} --namespace {namespace}
```

Create validate-rule

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create validate_rule -n <namespace> -i validate_rule.yaml

# Get
f5xcctl tenant_and_identity get validate_rule <name> -n <namespace>

# List
f5xcctl tenant_and_identity list validate_rule -n <namespace>

# Delete
f5xcctl tenant_and_identity delete validate_rule <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_validate_rule" "example" {
  name      = "example-validate-rule"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
