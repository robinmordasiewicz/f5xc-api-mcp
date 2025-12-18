---
page_title: f5xc_address_allocator - f5xc-api-mcp
subcategory: Organization
description: Create Address Allocator
---

# Address Allocator

Create Address Allocator will create an address allocator object in 'system' namespace of the user

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-address-allocator-create` | Create Address Allocator |
| `f5xc-api-core-address-allocator-get` | Get Address Allocator |
| `f5xc-api-core-address-allocator-list` | List Address Allocator |
| `f5xc-api-core-address-allocator-delete` | Delete Address Allocator |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Address Allocator resources:

### Create Address Allocator

> "Create a address-allocator named 'example' in the 'production' namespace"

### List Address Allocators

> "List all address-allocators in the 'production' namespace"

### Get Address Allocator Details

> "Get details of the address-allocator named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl apply -f address_allocator.yaml

# Get
f5xcctl get address_allocator {name} -n {namespace}

# List
f5xcctl get address_allocators -n {namespace}

# Delete
f5xcctl delete address_allocator {name} -n {namespace}
```

## Terraform Resource

```hcl
resource "volterra_address_allocator" "example" {
  name      = "example-address-allocator"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
