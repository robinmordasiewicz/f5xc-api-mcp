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
f5xcctl configuration create deployment_statu -n <namespace> -i deployment_statu.yaml

# Get
f5xcctl configuration get deployment_statu -n <namespace> <name>

# List
f5xcctl configuration list deployment_statu -n <namespace>

# Delete
f5xcctl configuration delete deployment_statu -n <namespace> <name>
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
