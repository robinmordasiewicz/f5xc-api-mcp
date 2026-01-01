---
page_title: f5xc_subnet - f5xc-api-mcp
subcategory: Network
description: Create Subnet.
---

# Subnet

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Subnet object contains configuration for an interface of a VM/pod.
It is created in user or shared
namespace.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-subnet-create` | Create Subnet. |
| `f5xc-api-network-subnet-get` | GET Subnet. |
| `f5xc-api-network-subnet-list` | List Subnet. |
| `f5xc-api-network-subnet-update` | Replace Subnet. |
| `f5xc-api-network-subnet-delete` | DELETE Subnet. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |
| `metadata.name` | Name | `Example-corp-web.` |

### Query Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `response_format` | The format in which the configuration object is to be fetched. This could be for example | `-` |
| `label_filter` | A LabelSelectorType expression that every item in list response will satisfy. | `Env in (staging, testing), tier in (web, db)` |
| `report_fields` | The report_fields parameter | `-` |
| `report_status_fields` | The report_status_fields parameter | `-` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- subnet

**Modifies:**

- subnet

**Deletes:**

- subnet
- contained_resources

## Example Usage

Ask Claude to help you work with Subnet resources:

### Create Subnet

> "Create a subnet named 'example' in the 'production' namespace"

### List Subnets

> "List all subnets in the 'production' namespace"

### Get Subnet Details

> "Get details of the subnet named 'example' in namespace 'production'"

## xcsh Equivalent

```bash
# Create/Update
xcsh network create subnet -n <namespace> -i subnet.yaml

# Get
xcsh network get subnet <name> -n <namespace>

# List
xcsh network list subnet -n <namespace>

# Delete
xcsh network delete subnet <name> -n <namespace>
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
