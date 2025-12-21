---
page_title: f5xc_deployment - f5xc-api-mcp
subcategory: Security
description: GET list of bot detection rule deployments.
---

# Deployment

Getbotdetectionrulesdeployments CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-deployment-list` | GET list of bot detection rule deployments. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `rules_deployment_status` | The deployments will be filtered by the deployment status values provided. This field is optional. If no deployment status values are provided, all the deployments will be fetched |

## Example Usage

Ask Claude to help you work with Deployment resources:

### List Deployments

> "List all deployments in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create deployment -n <namespace> -i deployment.yaml

# Get
f5xcctl security get deployment <name> -n <namespace>

# List
f5xcctl security list deployment -n <namespace>

# Delete
f5xcctl security delete deployment <name> -n <namespace>
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
