---
page_title: f5xc_subnet - f5xc-api-mcp
subcategory: Organization
description: Create Subnet
---

# Subnet

Subnet object contains configuration for an interface of a VM/pod.
It is created in user or shared
namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-core-subnet-create` | Create Subnet |
| `f5xc-api-core-subnet-get` | Get Subnet |
| `f5xc-api-core-subnet-list` | List Subnet |
| `f5xc-api-core-subnet-update` | Replace Subnet |
| `f5xc-api-core-subnet-delete` | Delete Subnet |

## Parameters

### Path Parameters

| Parameter | Description |
|-----------|-------------|
| `metadata.namespace` | namespace |
| `name` | name |
| `namespace` | namespace |
| `metadata.name` | name |

### Query Parameters

| Parameter | Description |
|-----------|-------------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example |
| `label_filter` | The label_filter parameter |
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
f5xcctl apply -f subnet.yaml

# Get
f5xcctl get subnet {name} -n {namespace}

# List
f5xcctl get subnets -n {namespace}

# Delete
f5xcctl delete subnet {name} -n {namespace}
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
