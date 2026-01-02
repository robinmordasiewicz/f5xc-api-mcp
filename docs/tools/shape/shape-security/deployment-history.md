---
page_title: f5xc_deployment_history - f5xc-api-mcp
subcategory: Shape
description: Deployment History.
---

# Deployment History

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET deployment history.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-deployment-history-get` | Deployment History. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

## Example Usage

Ask Claude to help you work with Deployment History resources:

### Get Deployment History Details

> "Get details of the deployment-history named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh shape create deployment_history -n <namespace> -i deployment_history.yaml

# Get
xcsh shape get deployment_history <name> -n <namespace>

# List
xcsh shape list deployment_history -n <namespace>

# Delete
xcsh shape delete deployment_history <name> -n <namespace>
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
