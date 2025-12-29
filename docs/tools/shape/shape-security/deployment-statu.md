---
page_title: f5xc_deployment_statu - f5xc-api-mcp
subcategory: Shape
description: Deployment Status.
---

# Deployment Statu

!!! info "Low Risk"
    Operations on this resource are generally safe.

GET deployment status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-shape-deployment-statu-get` | Deployment Status. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `name` | Name | `Name` |
| `namespace` | Name Space | `Ns1` |

## Example Usage

Ask Claude to help you work with Deployment Statu resources:

### Get Deployment Statu Details

> "Get details of the deployment-statu named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### get_specific

```bash
f5xcctl shape deployment-statu get {name} --namespace {namespace}
```

Get specific deployment-statu

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl shape create deployment_statu -n <namespace> -i deployment_statu.yaml

# Get
f5xcctl shape get deployment_statu <name> -n <namespace>

# List
f5xcctl shape list deployment_statu -n <namespace>

# Delete
f5xcctl shape delete deployment_statu <name> -n <namespace>
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
