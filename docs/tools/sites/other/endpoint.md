---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Sites
description: Endpoints List.
---

# Endpoint

!!! info "Low Risk"
    Operations on this resource are generally safe.

API to GET list of endpoints for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-sites-endpoint-list` | Endpoints List. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `site` | Site | `Site-1` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace to scope the listing of endpoints in a site. | `Ns1` |

## Example Usage

Ask Claude to help you work with Endpoint resources:

### List Endpoints

> "List all endpoints in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh sites create endpoint -n <namespace> -i endpoint.yaml

# Get
xcsh sites get endpoint <name> -n <namespace>

# List
xcsh sites list endpoint -n <namespace>

# Delete
xcsh sites delete endpoint <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_endpoint" "example" {
  name      = "example-endpoint"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
