---
page_title: f5xc_health_statu - f5xc-api-mcp
subcategory: Service Mesh
description: Discovered Service Health Status.
---

# Health Statu

GET Discovered Service Health status.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-servicemesh-health-statu-get` | Discovered Service Health Status. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `name` | Name |
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Health Statu resources:

### Get Health Statu Details

> "Get details of the health-statu named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl configuration create health_statu -n <namespace> -i health_statu.yaml

# Get
f5xcctl configuration get health_statu -n <namespace> <name>

# List
f5xcctl configuration list health_statu -n <namespace>

# Delete
f5xcctl configuration delete health_statu -n <namespace> <name>
```

## Terraform Resource

```hcl
resource "volterra_health_statu" "example" {
  name      = "example-health-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
