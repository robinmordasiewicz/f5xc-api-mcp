---
page_title: f5xc_deployment_statu - f5xc-api-mcp
subcategory: Security
description: Deployment Status.
---

# Deployment Statu

GET deployment status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-security-deployment-statu-get` | Deployment Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Name Space |

## Example Usage

Ask Claude to help you work with Deployment Statu resources:

### Get Deployment Statu Details

> "Get details of the deployment-statu named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl security create deployment_statu -n <namespace> -i deployment_statu.yaml

# Get
f5xcctl security get deployment_statu <name> -n <namespace>

# List
f5xcctl security list deployment_statu -n <namespace>

# Delete
f5xcctl security delete deployment_statu <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_deployment_statu" "example" {
  name      = "example-deployment-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
