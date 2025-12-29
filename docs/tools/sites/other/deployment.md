---
page_title: f5xc_deployment - f5xc-api-mcp
subcategory: Sites
description: Deployment List.
---

# Deployment

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of deployments for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-deployment-list` | Deployment List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of deployments in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Deployment resources:

### List Deployments

> "List all deployments in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### list_all

```bash
f5xcctl data deployment list --namespace {namespace}
```

List all deployments

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl sites create deployment -n <namespace> -i deployment.yaml

# Get
f5xcctl sites get deployment <name> -n <namespace>

# List
f5xcctl sites list deployment -n <namespace>

# Delete
f5xcctl sites delete deployment <name> -n <namespace>
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
