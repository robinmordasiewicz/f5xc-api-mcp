---
page_title: f5xc_by_network - f5xc-api-mcp
subcategory: Statistics
description: L3l4 Network Traffic Query.
---

# By Network

!!! warning "Medium Risk"
    Some operations on this resource may modify or delete data.

Request to GET l3l4 Network Traffic data.

## Tools

| Tool | Description |
|------|-------------|
| `f5xc-api-statistics-by-network-create` | L3l4 Network Traffic Query. |

## Parameters

### Path Parameters

| Parameter | Description | Example |
|-----------|-------------|--------|
| `namespace` | Namespace | `Value` |
| `network_id` | NetworkId | `Value` |

## Side Effects

Operations on this resource may have the following effects:

**Creates:**

- by-network

## Example Usage

Ask Claude to help you work with By Network resources:

### Create By Network

> "Create a by-network named 'example' in the 'production' namespace"

## CLI Examples

Examples from the enriched OpenAPI specifications:

### basic_create

```bash
f5xcctl infraprotect by-network create {name} --namespace {namespace}
```

Create by-network

### file_based

```bash
f5xcctl infraprotect by-network create -f {file}.yaml
```

Create from YAML file

## f5xcctl Equivalent

```bash
# Create/Update
f5xcctl statistics create by_network -n <namespace> -i by_network.yaml

# Get
f5xcctl statistics get by_network <name> -n <namespace>

# List
f5xcctl statistics list by_network -n <namespace>

# Delete
f5xcctl statistics delete by_network <name> -n <namespace>
```

## Terraform Resource

```hcl
resource "volterra_by_network" "example" {
  name      = "example-by-network"
  namespace = "default"

  # Add resource-specific configuration
  # See F5XC Terraform Provider documentation for details
}
```

See the [F5XC Terraform Provider documentation][tf-docs] for detailed configuration options.

[tf-docs]: https://registry.terraform.io/providers/robinmordasiewicz/f5xc/latest/docs
