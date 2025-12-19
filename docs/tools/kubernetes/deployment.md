---
page_title: f5xc_deployment - f5xc-api-mcp
subcategory: Kubernetes
description: Get list of bot detection rule deployments
---

# Deployment

Get list of bot detection rule deployments

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-deployment-list` | Get list of bot detection rule deployments |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `rules_deployment_status` | The rules_deployment_status parameter |

## Example Usage

Ask Claude to help you work with Deployment resources:

### List Deployments

> "List all deployments in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create deployment -n <namespace> -i deployment.yaml

# Get
f5xcctl configuration get deployment -n <namespace> <name>

# List
f5xcctl configuration list deployment -n <namespace>

# Delete
f5xcctl configuration delete deployment -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_deployment" "example" {
  name      = "example-deployment"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
