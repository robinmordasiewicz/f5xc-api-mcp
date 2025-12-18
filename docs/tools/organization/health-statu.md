---
page_title: f5xc_health_statu - f5xc-api-mcp
subcategory: Organization
description: Discovered Service Health Status
---

# Health Statu

Get Discovered Service Health status

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-health-statu-get` | Discovered Service Health Status |

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
f5xcctl apply -f health_statu.yaml

# Get
f5xcctl get health_statu {name} -n {namespace}

# List
f5xcctl get health_status -n {namespace}

# Delete
f5xcctl delete health_statu {name} -n {namespace}
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
