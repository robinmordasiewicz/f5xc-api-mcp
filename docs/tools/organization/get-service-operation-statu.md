---
page_title: f5xc_get_service_operation_statu - f5xc-api-mcp
subcategory: Organization
description: Get Service Operation Status
---

# Get Service Operation Statu

Get status of an operation command for a given CDN Loadbalancer.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-get-service-operation-statu-create` | Get Service Operation Status |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `namespace` | Namespace |

## Example Usage

Ask Claude to help you work with Get Service Operation Statu resources:

### Create Get Service Operation Statu

> "Create a get-service-operation-statu named 'example' in the 'production' namespace"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f get_service_operation_statu.yaml

# Get
f5xcctl get get_service_operation_statu {name} -n {namespace}

# List
f5xcctl get get_service_operation_status -n {namespace}

# Delete
f5xcctl delete get_service_operation_statu {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_get_service_operation_statu" "example" {
  name      = "example-get-service-operation-statu"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
