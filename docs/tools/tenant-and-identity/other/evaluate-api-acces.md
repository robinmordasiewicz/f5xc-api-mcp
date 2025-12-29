---
page_title: f5xc_evaluate_api_acces - f5xc-api-mcp
subcategory: Tenant And Identity
description: Evaluate API Access.
---

# Evaluate API Acces

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

EvaluateAPIAccess can evaluate multiple lists of API URL, method under a namespace for a given user
of a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-tenantandidentity-evaluate-api-acces-create` | Evaluate API Access. |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- evaluate-api-acces

## Example Usage

Ask Claude to help you work with Evaluate API Acces resources:

### Create Evaluate API Acces

> "Create a evaluate-api-acces named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl web evaluate-api-acces create {name} --namespace {namespace}
```

Create evaluate-api-acces

### file_based

```bash
f5xcctl web evaluate-api-acces create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl tenant_and_identity create evaluate_api_acces -n <namespace> -i evaluate_api_acces.yaml

# Get
f5xcctl tenant_and_identity get evaluate_api_acces <name> -n <namespace>

# List
f5xcctl tenant_and_identity list evaluate_api_acces -n <namespace>

# Delete
f5xcctl tenant_and_identity delete evaluate_api_acces <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_evaluate_api_acces" "example" {
  name      = "example-evaluate-api-acces"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
