---
page_title: f5xc_deployment - f5xc-api-mcp
subcategory: Shape
description: GET list of bot detection rule deployments.
---

# Deployment

!!! info "Low Risk"
    Operations on this resource are generally safe.

Getbotdetectionrulesdeployments CustomAPI.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-deployment-list` | GET list of bot detection rule deployments. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `System` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `rules_deployment_status` | The deployments will be filtered by the deployment status values provided. This field is optional. If no deployment status values are provided, all the deployments will be fetched | `[BOT_DETECTION_RULES_DEPLOYMENT_STATUS_INITIATED, BOT_DETECTION_RULES_DEPLOYMENT_STATUS_PARTIALLY_INITIATED]` |

## Example Usage

Ask Claude to help you work with Deployment resources:

### List Deployments

> "List all deployments in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl shape deployment list --namespace {namespace}
```

List all deployments

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create deployment -n <namespace> -i deployment.yaml

# Get
f5xcctl shape get deployment <name> -n <namespace>

# List
f5xcctl shape list deployment -n <namespace>

# Delete
f5xcctl shape delete deployment <name> -n <namespace>
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
