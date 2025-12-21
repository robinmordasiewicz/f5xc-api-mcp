---
page_title: f5xc_evaluate - f5xc-api-mcp
subcategory: API Security
description: Evaluate API Group.
---

# Evaluate

Evaluate API Group Builder against all API endpoints associated with the referenced object and
return the resulting API Group.
For example, if the referenced object is an HTTP LB then all
discovered and imported endpoints are associated with it.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-apisecurity-evaluate-create` | Evaluate API Group. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Evaluate resources:

### Create Evaluate

> "Create a evaluate named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl api_security create evaluate -n <namespace> -i evaluate.yaml

# Get
f5xcctl api_security get evaluate <name> -n <namespace>

# List
f5xcctl api_security list evaluate -n <namespace>

# Delete
f5xcctl api_security delete evaluate <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_evaluate" "example" {
  name      = "example-evaluate"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
