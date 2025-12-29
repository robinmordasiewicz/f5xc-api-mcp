---
page_title: f5xc_address_allocator - f5xc-api-mcp
subcategory: Network
description: Create Address Allocator.
---

# Address Allocator

!!! danger "High Risk Operation"
    This resource includes operations that may cause significant changes. Review carefully before executing.

!!! note "Confirmation Required"
    Some operations on this resource require explicit confirmation before execution.

Create Address Allocator will create an address allocator object in 'system' namespace of the user.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-network-address-allocator-create` | Create Address Allocator. |
| `f5xc-api-network-address-allocator-get` | GET Address Allocator. |
| `f5xc-api-network-address-allocator-list` | List Address Allocator. |
| `f5xc-api-network-address-allocator-delete` | DELETE Address Allocator. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `metadata.namespace` | Namespace | `Staging` |
| `name` | Name | `Name` |
| `namespace` | Namespace | `Ns1` |

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

- address-allocator

**Deletes:**

- address-allocator
- contained_resources

## Example Usage

Ask Claude to help you work with Address Allocator resources:

### Create Address Allocator

> "Create a address-allocator named 'example' in the 'production' namespace"

### List Address Allocators

> "List all address-allocators in the 'production' namespace"

### Get Address Allocator Details

> "Get details of the address-allocator named 'example' in namespace 'production'"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl config address-allocator create {name} --namespace {namespace}
```

Create address-allocator

### file_based

```bash
f5xcctl config address-allocator create -f {file}.yaml
```

Create from YAML file

### delete

```bash
f5xcctl config address-allocator delete {name} --namespace {namespace}
```

Delete address-allocator

### get_specific

```bash
f5xcctl config address-allocator get {name} --namespace {namespace}
```

Get specific address-allocator

### list_all

```bash
f5xcctl config address-allocator list --namespace {namespace}
```

List all address-allocators

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl network create address_allocator -n <namespace> -i address_allocator.yaml

# Get
f5xcctl network get address_allocator <name> -n <namespace>

# List
f5xcctl network list address_allocator -n <namespace>

# Delete
f5xcctl network delete address_allocator <name> -n <namespace>
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
