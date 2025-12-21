---
page_title: f5xc_subnet - f5xc-api-mcp
subcategory: Networking
description: Create Subnet.
---

# Subnet

Subnet object contains configuration for an interface of a VM/pod.
It is created in user or shared
namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-networking-subnet-create` | Create Subnet. |
| `f5xc-api-networking-subnet-get` | GET Subnet. |
| `f5xc-api-networking-subnet-list` | List Subnet. |
| `f5xc-api-networking-subnet-update` | Replace Subnet. |
| `f5xc-api-networking-subnet-delete` | DELETE Subnet. |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | Namespace |
| `name` | Name |
| `namespace` | Namespace |
| `metadata.name` | Name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. |
| `report_fields` | The report_fields parameter |
| `report_status_fields` | The report_status_fields parameter |

## Example Usage

Ask Claude to help you work with Subnet resources:

### Create Subnet

> "Create a subnet named 'example' in the 'production' namespace"

### List Subnets

> "List all subnets in the 'production' namespace"

### Get Subnet Details

> "Get details of the subnet named 'example' in namespace 'production'"

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl networking create subnet -n <namespace> -i subnet.yaml

# Get
f5xcctl networking get subnet <name> -n <namespace>

# List
f5xcctl networking list subnet -n <namespace>

# Delete
f5xcctl networking delete subnet <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_subnet" "example" {
  name      = "example-subnet"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
