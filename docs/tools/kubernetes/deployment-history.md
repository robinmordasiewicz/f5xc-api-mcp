---
page_title: f5xc_deployment_history - f5xc-api-mcp
subcategory: Kubernetes
description: Deployment History
---

# Deployment History

Get deployment history

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-deployment-history-get` | Deployment History |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Deployment History resources:

### Get Deployment History Details

> "Get details of the deployment-history named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create deployment_history -n <namespace> -i deployment_history.yaml

# Get
f5xcctl configuration get deployment_history -n <namespace> <name>

# List
f5xcctl configuration list deployment_history -n <namespace>

# Delete
f5xcctl configuration delete deployment_history -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_deployment_history" "example" {
  name      = "example-deployment-history"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
