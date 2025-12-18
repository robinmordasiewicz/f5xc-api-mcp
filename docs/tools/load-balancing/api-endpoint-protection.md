---
page_title: f5xc_api_endpoint_protection - f5xc-api-mcp
subcategory: Load Balancing
description: Suggest API endpoint protection rule
---

# API Endpoint Protection

Suggest API endpoint protection rule for a given path

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-api-endpoint-protection-create` | Suggest API endpoint protection rule |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with API Endpoint Protection resources:

### Create API Endpoint Protection

> "Create a api-endpoint-protection named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f api_endpoint_protection.yaml

# Get
f5xcctl get api_endpoint_protection {name} -n {namespace}

# List
f5xcctl get api_endpoint_protections -n {namespace}

# Delete
f5xcctl delete api_endpoint_protection {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_api_endpoint_protection" "example" {
  name      = "example-api-endpoint-protection"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
