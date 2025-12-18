---
page_title: f5xc_evaluate_batch_api_acces - f5xc-api-mcp
subcategory: Organization
description: Evaluate Batch API Access
---

# Evaluate Batch API Acces

EvaluateBatchAPIAccess can evaluate multiple lists of API url, method under a batch of namespaces
for a given user of a tenant.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-evaluate-batch-api-acces-create` | Evaluate Batch API Access |

## Example Usage

Ask Claude to help you work with Evaluate Batch API Acces resources:

### Create Evaluate Batch API Acces

> "Create a evaluate-batch-api-acces named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f evaluate_batch_api_acces.yaml

# Get
f5xcctl get evaluate_batch_api_acces {name} -n {namespace}

# List
f5xcctl get evaluate_batch_api_access -n {namespace}

# Delete
f5xcctl delete evaluate_batch_api_acces {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_evaluate_batch_api_acces" "example" {
  name      = "example-evaluate-batch-api-acces"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
