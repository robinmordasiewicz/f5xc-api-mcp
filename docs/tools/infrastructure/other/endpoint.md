---
page_title: f5xc_endpoint - f5xc-api-mcp
subcategory: Infrastructure
description: Endpoints List.
---

# Endpoint

API to GET list of endpoints for a given namespace in a site.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-infrastructure-endpoint-list` | Endpoints List. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `site` | Site |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace to scope the listing of endpoints in a site. |

## Example Usage

Ask Claude to help you work with Endpoint resources:

### List Endpoints

> "List all endpoints in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl infrastructure create endpoint -n <namespace> -i endpoint.yaml

# Get
f5xcctl infrastructure get endpoint <name> -n <namespace>

# List
f5xcctl infrastructure list endpoint -n <namespace>

# Delete
f5xcctl infrastructure delete endpoint <name> -n <namespace>
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
