---
page_title: f5xc_api_endpoint_protection - f5xc-api-mcp
subcategory: API
description: Suggest API endpoint protection rule.
---

# API Endpoint Protection

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Suggest API endpoint protection rule for a given path.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-api-api-endpoint-protection-create` | Suggest API endpoint protection rule. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Shared` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- api-endpoint-protection

## Example Usage

Ask Claude to help you work with API Endpoint Protection resources:

### Create API Endpoint Protection

> "Create a api-endpoint-protection named 'example' in the 'production' namespace"

## xcsh Equivalent

```bash
# Create/Update
xcsh api create api_endpoint_protection -n <namespace> -i api_endpoint_protection.yaml

# Get
xcsh api get api_endpoint_protection <name> -n <namespace>

# List
xcsh api list api_endpoint_protection -n <namespace>

# Delete
xcsh api delete api_endpoint_protection <name> -n <namespace>
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
