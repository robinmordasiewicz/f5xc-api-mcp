---
page_title: f5xc_evaluate_api_acces - f5xc-api-mcp
subcategory: Organization
description: Evaluate API Access
---

# Evaluate API Acces

EvaluateAPIAccess can evaluate multiple lists of API url, method under a namespace for a given user
of a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-evaluate-api-acces-create` | Evaluate API Access |

## Example Usage

Ask Claude to help you work with Evaluate API Acces resources:

### Create Evaluate API Acces

> "Create a evaluate-api-acces named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create evaluate_api_acces -n <namespace> -i evaluate_api_acces.yaml

# Get
f5xcctl configuration get evaluate_api_acces -n <namespace> <name>

# List
f5xcctl configuration list evaluate_api_acces -n <namespace>

# Delete
f5xcctl configuration delete evaluate_api_acces -n <namespace> <name>
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
